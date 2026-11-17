const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  const origin = req.headers.origin;
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      const allowed = host === 'elijahogunbiyi.com'
        || host === 'www.elijahogunbiyi.com'
        || host === 'localhost'
        || host.endsWith('.vercel.app');
      if (!allowed) return sendJson(res, 403, { error: 'Request origin not allowed.' });
    } catch {
      return sendJson(res, 403, { error: 'Invalid request origin.' });
    }
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();
  const honeypot = String(body._gotcha ?? '').trim();

  if (honeypot) return sendJson(res, 200, { ok: true });
  if (name.length < 2 || name.length > 120) return sendJson(res, 400, { error: 'Please enter a valid name.' });
  if (!EMAIL_RE.test(email) || email.length > 254) return sendJson(res, 400, { error: 'Please enter a valid email address.' });
  if (message.length < 10 || message.length > 10000) return sendJson(res, 400, { error: 'Please enter a message between 10 and 10,000 characters.' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return sendJson(res, 503, { error: 'Email service is not configured yet.' });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elijah Ogunbiyi <contact@elijahogunbiyi.com>',
        to: ['ogunbiye@gmail.com'],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.json().catch(() => ({}));
      console.error('Resend contact send failed:', detail);
      return sendJson(res, 502, { error: 'The email provider could not send your message. Please try again later.' });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact email request failed:', error);
    return sendJson(res, 500, { error: 'Unable to send your message right now.' });
  }
}
