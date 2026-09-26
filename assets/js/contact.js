// Contact form (Formspree over fetch) and copy-to-clipboard buttons.
//
// The form posts to SITE.formEndpoint with `Accept: application/json`, so the
// visitor never leaves the page. A hidden honeypot field (_gotcha) catches
// most bots; if it's filled we pretend to succeed and send nothing.

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
  // Be liberal in what we accept: trim stray whitespace before sending.
  for (const key of ['name', 'email', 'message']) data.set(key, String(data.get(key) ?? '').trim());
  data.set('_subject', `Portfolio enquiry from ${data.get('name')}`);
  return data;
}

function setStatus(form, state, message = '') {
  const button = form.querySelector('[type="submit"]');
  const label = button.querySelector('[data-label]');
  const status = form.querySelector('[data-form-status]');
  button.disabled = state === 'sending';
  button.setAttribute('aria-busy', String(state === 'sending'));
  label.textContent = state === 'sending' ? 'Sending…' : 'Send message';
  status.hidden = state !== 'error';
  if (state === 'error') status.innerHTML = message;
}

export function initContact() {
  initCopyButtons();

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.setAttribute('action', SITE.formEndpoint);

  // Clear a field's error as soon as it becomes valid.
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

    if (form.elements._gotcha?.value) {
      showSuccess();
      return;
    }

    setStatus(form, 'sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        body: buildPayload(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.errors?.map((x) => x.message).join(' ') || `Request failed (${res.status}).`);
      }
      setStatus(form, 'idle');
      showSuccess();
      form.reset();
    } catch (err) {
      setStatus(
        form,
        'error',
        `Sorry, the message didn’t go through (${escapeHtml(err.message)}). ` +
          `Please email me directly at <a class="link text-fg" href="mailto:${SITE.email}">${SITE.email}</a>.`,
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

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}
