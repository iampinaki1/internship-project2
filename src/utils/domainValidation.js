import { validateDomain } from './validateDomain';
import { APP_CONFIG } from '../config/appConfig';

export const ALLOWED_DOMAIN = APP_CONFIG.ALLOWED_EMAIL_DOMAIN.replace('@', '');
export const RESTRICTED_DOMAIN_ERROR =
  'Access restricted. Please login using your official domain email.';

/**
 * Validates whether an email belongs to the allowed organizational domain.
 * Uses validateDomain() based on APP_CONFIG.ALLOWED_EMAIL_DOMAIN
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

  const isValid = validateDomain(email);

  if (!isValid) {
    return {
      isValid: false,
      error: RESTRICTED_DOMAIN_ERROR,
    };
  }

  return {
    isValid: true,
    email: email.trim().toLowerCase(),
    domain: ALLOWED_DOMAIN,
  };
}

export { validateDomain, APP_CONFIG };
export default validateEmailDomain;
