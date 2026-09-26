// Site-wide settings. Change contact details, links or navigation here and
// every page picks them up: the header, the footer, the contact form and
// any element marked with data-link="…" (see bindLinks in main.js).

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

  // Set to false to hide the "Available for new projects" badges.
  available: true,
  availabilityText: 'Available for freelance work',

  nav: [
    { label: 'Work', href: '/#work', id: 'work' },
    { label: 'About', href: '/#about', id: 'about' },
    { label: 'Experience', href: '/#experience', id: 'experience' },
  ],
};

export const LINKS = {
  email: `mailto:${SITE.email}`,
  whatsapp: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`,
  github: SITE.github,
  linkedin: SITE.linkedin,
  cv: SITE.cv,
};
