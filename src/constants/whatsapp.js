// ── Central WhatsApp Bot Config ──────────────────────────────
// Change number here → updates everywhere in the portfolio

export const WA_NUMBER = "919187082916"; // with country code, no +

// Pre-filled messages for different entry points
export const WA = {
  // Generic — from floating button / hero
  general: `https://wa.me/${WA_NUMBER}?text=Hi%20Sawan!%20%F0%9F%91%8B%20I%20visited%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.`,

  // From "Hire Me" button
  hire: `https://wa.me/${WA_NUMBER}?text=Hi%20Sawan!%20%F0%9F%91%8B%20I%27d%20like%20to%20hire%20you%20for%20a%20project.%20Can%20we%20discuss%3F`,

  // From Quote form (dynamic — built in Quote.jsx)
  quoteBase: `https://wa.me/${WA_NUMBER}?text=`,

  // From Contact section
  contact: `https://wa.me/${WA_NUMBER}?text=Hi%20Sawan!%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20get%20in%20touch.`,

  // From Reviews CTA
  reviews: `https://wa.me/${WA_NUMBER}?text=Hi%20Sawan!%20I%20saw%20your%20client%20reviews%20and%20I%27d%20like%20to%20work%20with%20you.`,

  // From About section
  about: `https://wa.me/${WA_NUMBER}?text=Hi%20Sawan!%20I%20read%20about%20you%20and%20I%27d%20like%20to%20discuss%20a%20freelance%20project.`,
};
