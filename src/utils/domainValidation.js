/**
 * Domain validation utilities for HB+ Authentication
 * Restricts access strictly to authorized official domain (@hbplus.fit)
 */

export const ALLOWED_DOMAIN = 'hbplus.fit';
export const RESTRICTED_DOMAIN_ERROR =
  'Access restricted. Please login using your official domain email.';

/**
 * Validates whether an email belongs to the allowed organizational domain.
 * @param {string} email
 * @returns {{ isValid: boolean, error?: string, email?: string, domain?: string }}
 */
export function validateEmailDomain(email) {
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'Please enter a valid email address.',
    };
  }

  const normalized = email.trim().toLowerCase();
  const atIndex = normalized.lastIndexOf('@');

  if (atIndex === -1 || atIndex === 0 || atIndex === normalized.length - 1) {
    return {
      isValid: false,
      error: 'Invalid email format.',
    };
  }

  const domain = normalized.slice(atIndex + 1);

  if (domain !== ALLOWED_DOMAIN) {
    return {
      isValid: false,
      error: RESTRICTED_DOMAIN_ERROR,
      domain,
      email: normalized,
    };
  }

  return {
    isValid: true,
    email: normalized,
    domain,
  };
}

export default validateEmailDomain;

