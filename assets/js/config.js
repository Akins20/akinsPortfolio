// Site-wide settings. Change contact details or links here and every page
// picks them up: the contact form and any element marked with data-link="…"
// or data-text="…" (see bind.js).

export const SITE = {
  name: 'Elijah Ogunbiyi',
  role: 'Full-Stack & AI Engineer',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  timeZoneLabel: 'WAT',

  email: 'ogunbiye@gmail.com',

  // WhatsApp: digits only, international format, no "+".
  whatsapp: '2348113209561',
  whatsappDisplay: '+234 811 320 9561',
  whatsappMessage: "Hi Elijah, I found your portfolio and I'd like to talk about a project.",

  github: 'https://github.com/Akins20',
  linkedin: 'https://www.linkedin.com/in/ogunbiyi-elijah',
  cv: '/assets/cv/Ogunbiyi_Elijah_CV_2026.pdf',

  // Contact form endpoint (Formspree). Swap for another form backend if needed.
  formEndpoint: 'https://formspree.io/f/mleynole',

  // Set to false to hide the "Available for freelance work" line.
  available: true,
  availabilityText: 'Available for freelance work',
};

export const LINKS = {
  email: `mailto:${SITE.email}`,
  whatsapp: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`,
  github: SITE.github,
  linkedin: SITE.linkedin,
  cv: SITE.cv,
};
