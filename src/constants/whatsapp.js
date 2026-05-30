// ── Central WhatsApp Bot Config ──────────────────────────────
// Change number here → updates everywhere in the portfolio

export const WA_NUMBER = "919187082916"; // with country code, no +

// Helper — clean encode, no emoji issues
const wa = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WA = {
  // Generic — floating button / hero
  general: wa("Hi Sawan, I visited your portfolio and I'd like to discuss a project."),

  // From "Get a Free Quote" / "Hire Me" button
  hire: wa("Hi Sawan, I found your portfolio and I'd like to hire you for a project. Can we discuss?"),

  // From Quote form (dynamic — built in Quote.jsx)
  quoteBase: `https://wa.me/${WA_NUMBER}?text=`,

  // From Contact section
  contact: wa("Hi Sawan, I found your portfolio and I'd like to get in touch."),

  // From Reviews CTA
  reviews: wa("Hi Sawan, I saw your client reviews and I'd like to work with you."),

  // From About section
  about: wa("Hi Sawan, I read about you and I'd like to discuss a freelance project."),
};
