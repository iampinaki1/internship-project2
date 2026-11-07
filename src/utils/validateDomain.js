import { APP_CONFIG } from '../config/appConfig';

export const validateDomain = (email) => {
  if (!email || typeof email !== 'string') return false;

  const normalizedEmail = email.trim().toLowerCase();

  return normalizedEmail.endsWith(
    APP_CONFIG.ALLOWED_EMAIL_DOMAIN
  );
};

export default validateDomain;
