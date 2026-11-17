// Contact form (Resend API) and copy-to-clipboard buttons.
//
// The browser sends only the form fields to the same-origin Vercel endpoint.
// API credentials stay on the server and are never exposed to visitors.

import { SITE } from './config.js';
import { toast } from './toast.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please tell me your name.'),
  email: (v) => (EMAIL_RE.test(v.trim()) ? '' : 'That email address doesn’t look right.'),
  message: (v) => (v.trim().length >= 10 ? '' : 'A sentence or two about what you have in mind, please.'),
};

function setError(form, name, message) {
  const input = form.elements[name];
  const hint = form.querySelector(`[data-error-for="${name}"]`);
  if (!input || !hint) return;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  hint.textContent = message;
  hint.hidden = !message;
}

function validate(form) {
  let firstInvalid = null;
  for (const [name, rule] of Object.entries(RULES)) {
    const message = rule(form.elements[name]?.value ?? '');
    setError(form, name, message);
    if (message && !firstInvalid) firstInvalid = form.elements[name];
  }
  firstInvalid?.focus();
  return !firstInvalid;
}

function buildPayload(form) {
  const data = new FormData(form);
  return {
    name: String(data.get('name') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    message: String(data.get('message') ?? '').trim(),
    _gotcha: String(data.get('_gotcha') ?? ''),
  };
}

function setStatus(form, state, message = '') {
  const button = form.querySelector('[type="submit"]');
  const label = button.querySelector('[data-label]');
  const status = form.querySelector('[data-form-status]');
  button.disabled = state === 'sending';
  button.setAttribute('aria-busy', String(state === 'sending'));
  label.textContent = state === 'sending' ? 'Sending…' : 'Send message';
  status.hidden = state !== 'error';
  if (state === 'error') status.textContent = message;
}

export function initContact() {
  initCopyButtons();

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.setAttribute('action', SITE.formEndpoint);

  form.addEventListener('input', (e) => {
    const name = e.target.name;
    if (RULES[name] && e.target.getAttribute('aria-invalid') === 'true') {
      setError(form, name, RULES[name](e.target.value));
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate(form)) return;

    const success = document.querySelector('[data-form-success]');
    const showSuccess = () => {
      success.querySelector('[data-success-email]').textContent = form.elements.email.value.trim();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    };

    const payload = buildPayload(form);
    if (payload._gotcha) {
      showSuccess();
      return;
    }

    setStatus(form, 'sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status}).`);
      setStatus(form, 'idle');
      showSuccess();
      form.reset();
    } catch (err) {
      setStatus(
        form,
        'error',
        `Sorry, the message didn’t go through (${err.message}). Please email me directly at ${SITE.email}.`,
      );
    }
  });

  document.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    document.querySelector('[data-form-success]').hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = SITE[btn.dataset.copy] ?? btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        toast(`Copied ${value}`);
      } catch {
        toast(value);
      }
    });
  });
}
