import { validateDomain } from '../src/utils/validateDomain';
import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR, ALLOWED_DOMAIN } from '../src/utils/domainValidation';
import { firestoreService } from '../src/services/firestoreService';

describe('Domain Validation & Firestore Integration Suite', () => {
  describe('validateDomain Utility (Step 3 Tests)', () => {
    test("validateDomain('student@hbplus.fit') returns true", () => {
      expect(validateDomain('student@hbplus.fit')).toBe(true);
    });

    test("validateDomain('student@gmail.com') returns false", () => {
      expect(validateDomain('student@gmail.com')).toBe(false);
    });

    test("validateDomain('student@hbplus.fit.attacker.com') returns false", () => {
      expect(validateDomain('student@hbplus.fit.attacker.com')).toBe(false);
    });

    test('handles case-insensitivity correctly', () => {
      expect(validateDomain('STUDENT@HBPLUS.FIT')).toBe(true);
      expect(validateDomain('  Student@HBPlus.Fit  ')).toBe(true);
    });

    test('handles empty and null inputs safely', () => {
      expect(validateDomain('')).toBe(false);
      expect(validateDomain(null)).toBe(false);
      expect(validateDomain(undefined)).toBe(false);
    });
  });

  describe('validateEmailDomain Error Message Enforcement', () => {
    test('allows official domain student@hbplus.fit', () => {
      const result = validateEmailDomain('student@hbplus.fit');
      expect(result.isValid).toBe(true);
      expect(result.domain).toBe('hbplus.fit');
      expect(result.email).toBe('student@hbplus.fit');
    });

    test('rejects gmail.com with exact restricted message', () => {
      const result = validateEmailDomain('student@gmail.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
      expect(result.error).toBe('Access restricted. Please login using your official domain email.');
    });

    test('rejects spoofed subdomain student@hbplus.fit.attacker.com', () => {
      const result = validateEmailDomain('student@hbplus.fit.attacker.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
    });
  });

  describe('Firestore User Profile Sync', () => {
    test('syncUserProfile creates valid user document payload', async () => {
      const mockUser = {
        email: 'student@hbplus.fit',
        name: 'HB+ Official Intern',
        uid: 'test_uid_123',
      };

      const profile = await firestoreService.syncUserProfile(mockUser);
      expect(profile).toBeDefined();
      expect(profile.email).toBe('student@hbplus.fit');
      expect(profile.domain).toBe(ALLOWED_DOMAIN);
      expect(profile.role).toBe('Software Engineer Intern');
      expect(profile.status).toBe('Active');
      expect(profile.firestoreSynced).toBe(true);
    });
  });
});
