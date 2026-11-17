import { createHmac, timingSafeEqual } from 'node:crypto';

export const config = { api: { bodyParser: false } };

const INBOX = 'ogunbiye@gmail.com';
const SENDER = 'Elijah Ogunbiyi <contact@elijahogunbiyi.com>';
const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

function verifyWebhook(payload, headers, secret) {
  const id = headers['svix-id'];
  const timestamp = headers['svix-timestamp'];
  const signatureHeader = headers['svix-signature'];
  if (!id || !timestamp || !signatureHeader || !secret?.startsWith('whsec_')) return false;

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(Date.now() / 1000 - timestampNumber) > 300) return false;

  const key = Buffer.from(secret.slice('whsec_'.length), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${payload}`).digest();
  const candidates = signatureHeader.split(' ').flatMap((part) => {
    const [version, value] = part.split(',');
    return version === 'v1' && value ? [value] : [];
  });

  return candidates.some((candidate) => {
    try {
      const received = Buffer.from(candidate, 'base64');
      return received.length === expected.length && timingSafeEqual(received, expected);
    } catch {
      return false;
    }
  });
}

async function resendRequest(path, apiKey, options = {}) {
  const response = await fetch(`https://api.resend.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(options.headers || {}),
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || result.error || `Resend API returned ${response.status}`);
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!apiKey || !webhookSecret) return sendJson(res, 503, { error: 'Inbound email service is not configured.' });

  let rawBody;
  try {
    rawBody = await readRawBody(req);
  } catch {
    return sendJson(res, 400, { error: 'Could not read webhook payload.' });
  }

  if (!verifyWebhook(rawBody, req.headers, webhookSecret)) {
    return sendJson(res, 401, { error: 'Invalid webhook signature.' });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return sendJson(res, 400, { error: 'Invalid webhook JSON.' });
  }

  if (event.type !== 'email.received') return sendJson(res, 200, { received: true });
  const emailId = event.data?.email_id;
  if (!emailId) return sendJson(res, 400, { error: 'Missing received email ID.' });

  try {
    const emailResult = await resendRequest(`/emails/receiving/${encodeURIComponent(emailId)}`, apiKey);
    const email = emailResult.data || emailResult;
    const sender = String(email.from || event.data.from || 'Unknown sender');
    const subject = String(email.subject || event.data.subject || '(no subject)');
    const textBody = String(email.text || '').trim();
    const htmlBody = String(email.html || '').trim();
    const plainBody = textBody || htmlBody.replace(/<\/(p|div|br|li|h[1-6])\s*>/gi, '\n').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim() || '(This email has no readable text body.)';

    let attachments = [];
    try {
      const attachmentResult = await resendRequest(`/emails/receiving/${encodeURIComponent(emailId)}/attachments`, apiKey);
      const items = attachmentResult.data || [];
      let totalBytes = 0;
      attachments = (await Promise.all(items.map(async (item) => {
        if (!item.download_url || !item.filename) return null;
        const download = await fetch(item.download_url);
        if (!download.ok) return null;
        const buffer = Buffer.from(await download.arrayBuffer());
        totalBytes += buffer.length;
        if (totalBytes > MAX_ATTACHMENT_BYTES) return null;
        return { filename: item.filename, content: buffer.toString('base64') };
      }))).filter(Boolean);
    } catch (attachmentError) {
      console.error('Could not retrieve inbound attachments:', attachmentError);
    }

    const forwardedText = [
      'Forwarded message received at contact@elijahogunbiyi.com',
      '',
      `From: ${sender}`,
      `To: ${(event.data.to || []).join(', ')}`,
      `Subject: ${subject}`,
      '',
      plainBody,
      attachments.length ? '' : '',
      attachments.length ? `Attachments: ${attachments.map((item) => item.filename).join(', ')}` : '',
    ].filter((line) => line !== '').join('\n');

    await resendRequest('/emails', apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `inbound-${emailId}` },
      body: JSON.stringify({
        from: SENDER,
        to: [INBOX],
        reply_to: sender,
        subject: `Fwd: ${subject}`,
        text: forwardedText,
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    return sendJson(res, 200, { received: true, forwarded: true });
  } catch (error) {
    console.error('Inbound email forwarding failed:', error);
    return sendJson(res, 500, { error: 'Could not forward received email.' });
  }
}
