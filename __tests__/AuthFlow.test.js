import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR, ALLOWED_DOMAIN } from '../src/utils/domainValidation';
import { firestoreService } from '../src/services/firestoreService';

describe('Domain Validation & Firestore Integration Suite', () => {
  describe('Domain Validation Rules', () => {
    test('allows official domain example@hbplus.fit', () => {
      const result = validateEmailDomain('example@hbplus.fit');
      expect(result.isValid).toBe(true);
      expect(result.domain).toBe('hbplus.fit');
      expect(result.email).toBe('example@hbplus.fit');
    });

    test('rejects gmail.com with exact restricted message', () => {
      const result = validateEmailDomain('example@gmail.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
      expect(result.error).toBe('Access restricted. Please login using your official domain email.');
    });

    test('rejects other unauthorized domains', () => {
      const result = validateEmailDomain('intern@yahoo.com');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(RESTRICTED_DOMAIN_ERROR);
    });

    test('handles case-insensitivity correctly for hbplus.fit', () => {
      const result = validateEmailDomain('INTERN@HBPLUS.FIT');
      expect(result.isValid).toBe(true);
      expect(result.domain).toBe('hbplus.fit');
      expect(result.email).toBe('intern@hbplus.fit');
    });

    test('handles empty or malformed email strings', () => {
      expect(validateEmailDomain('').isValid).toBe(false);
      expect(validateEmailDomain(null).isValid).toBe(false);
      expect(validateEmailDomain('not-an-email').isValid).toBe(false);
    });
  });

  describe('Firestore User Profile Sync', () => {
    test('syncUserProfile creates valid user document payload', async () => {
      const mockUser = {
        email: 'example@hbplus.fit',
        name: 'HB+ Official Intern',
        uid: 'test_uid_123',
      };

      const profile = await firestoreService.syncUserProfile(mockUser);
      expect(profile).toBeDefined();
      expect(profile.email).toBe('example@hbplus.fit');
      expect(profile.domain).toBe(ALLOWED_DOMAIN);
      expect(profile.role).toBe('Software Engineer Intern');
      expect(profile.status).toBe('Active');
      expect(profile.firestoreSynced).toBe(true);
    });
  });
});

