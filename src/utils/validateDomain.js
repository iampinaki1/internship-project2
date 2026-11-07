import { APP_CONFIG } from '../config/appConfig';

export const validateDomain = (email) => {
  if (!email || typeof email !== 'string') return false;

  const normalizedEmail = email.trim().toLowerCase();

  // Use an exact domain match — split on '@' and compare the part after it.
  // endsWith() alone is not safe: "user@fakegmail.com" would pass an
  // endsWith('@gmail.com') check because the string happens to end with it.
  const parts = normalizedEmail.split('@');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;

  const emailDomain = parts[1]; // e.g. "gmail.com"
  const allowedDomain = APP_CONFIG.ALLOWED_EMAIL_DOMAIN.replace('@', ''); // strip leading @

  return emailDomain === allowedDomain;
};

export default validateDomain;

