/**
 * Validates if the email domain matches the allowed domain.
 * @param {string} email
 * @param {string} allowedDomain
 * @returns {boolean}
 */
export const validateDomain = (email, allowedDomain) => {
  if (!email || typeof email !== 'string') return false;
  const parts = email.trim().toLowerCase().split('@');
  if (parts.length !== 2) return false;
  if (!allowedDomain) return true;
  return parts[1] === allowedDomain.toLowerCase();
};

export default validateDomain;

