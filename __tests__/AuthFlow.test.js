import { validateDomain } from '../src/utils/validateDomain';
import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR, ALLOWED_DOMAIN } from '../src/utils/domainValidation';
import { APP_CONFIG } from '../src/config/appConfig';
import { firestoreService } from '../src/services/firestoreService';

describe('Domain Validation & Firestore Integration Suite', () => {
  const currentDomain = APP_CONFIG.ALLOWED_EMAIL_DOMAIN; // e.g. '@hbplus.fit'
  const isTestingWithGmail = currentDomain === '@gmail.com';

  describe('validateDomain Utility Tests', () => {
    test(`allows email matching current configured domain (${currentDomain})`, () => {
      const email = `student${currentDomain}`;
      expect(validateDomain(email)).toBe(true);
    });

    test('rejects spoofed attacker subdomain', () => {
      const email = `student${currentDomain}.attacker.com`;
      expect(validateDomain(email)).toBe(false);
    });

    test('handles case-insensitivity correctly', () => {
      const upper = `STUDENT${currentDomain.toUpperCase()}`;
      expect(validateDomain(upper)).toBe(true);
      expect(validateDomain(`  Student${currentDomain}  `)).toBe(true);
    });

    test('handles empty and null inputs safely', () => {
      expect(validateDomain('')).toBe(false);
      expect(validateDomain(null)).toBe(false);
      expect(validateDomain(undefined)).toBe(false);
    });
  });

  describe('validateEmailDomain Error Message Enforcement', () => {
    test(`allows configured domain (${currentDomain})`, () => {
      const validEmail = `student${currentDomain}`;
      const result = validateEmailDomain(validEmail);
      expect(result.isValid).toBe(true);
      expect(result.domain).toBe(ALLOWED_DOMAIN);
      expect(result.email).toBe(validEmail);
    });

    test('rejects unauthorized domain with exact restricted message', () => {
      const unauthorizedEmail = isTestingWithGmail
        ? 'student@unauthorized.com'
        : 'student@gmail.com';
      const result = validateEmailDomain(unauthorizedEmail);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
      expect(result.error).toBe('Access restricted. Please login using your official domain email.');
    });

    test('rejects spoofed subdomain', () => {
      const spoofed = `student${currentDomain}.attacker.com`;
      const result = validateEmailDomain(spoofed);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
    });
  });

  describe('Firestore User Profile Sync & Role-Based Access', () => {
    test('syncUserProfile creates standard user role for intern accounts', async () => {
      const mockUser = {
        email: `student${currentDomain}`,
        name: 'HB+ Official Intern',
        uid: 'test_uid_123',
      };

      const profile = await firestoreService.syncUserProfile(mockUser);
      expect(profile).toBeDefined();
      expect(profile.email).toBe(`student${currentDomain}`);
      expect(profile.domain).toBe(ALLOWED_DOMAIN);
      expect(profile.role).toBe('User');
      expect(profile.status).toBe('Active');
      expect(profile.firestoreSynced).toBe(true);
    });

    test('syncUserProfile assigns Admin role for admin accounts', async () => {
      const mockAdmin = {
        email: `admin${currentDomain}`,
        uid: 'admin_uid_456',
      };

      const profile = await firestoreService.syncUserProfile(mockAdmin);
      expect(profile).toBeDefined();
      expect(profile.role).toBe('Admin');
      expect(profile.name).toBe('HB+ Administrator');
    });
  });
});
