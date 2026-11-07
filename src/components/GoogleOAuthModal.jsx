import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';

export default function GoogleOAuthModal({
  visible,
  onClose,
  onSelectAccount,
  loading = false,
}) {
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelect = (email, name) => {
    onSelectAccount(email, name);
  };

  const handleCustomSubmit = () => {
    if (customEmail.trim()) {
      onSelectAccount(customEmail.trim(), 'Custom User');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Google Header */}
          <View style={styles.header}>
            <View style={styles.googleIconBadge}>
              <Text style={styles.googleLetter}>G</Text>
            </View>
            <Text style={styles.title}>Sign in with Google</Text>
            <Text style={styles.subtitle}>Choose an account to continue to HB+</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.warmCoral} />
              <Text style={styles.loadingText}>Validating organizational domain...</Text>
            </View>
          ) : (
            <View style={styles.content}>
              {/* Account 1: Authorized Official Domain */}
              <TouchableOpacity
                style={styles.accountOption}
                onPress={() => handleSelect('example@hbplus.fit', 'HB+ Official Intern')}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Sign in with example@hbplus.fit"
              >
                <View style={[styles.avatar, { backgroundColor: Colors.warmCoral }]}>
                  <Text style={styles.avatarText}>HB</Text>
                </View>
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>HB+ Official Intern</Text>
                  <Text style={styles.accountEmail}>example@hbplus.fit</Text>
                  <Text style={styles.authorizedTag}>✓ Official Domain (@hbplus.fit)</Text>
                </View>
              </TouchableOpacity>

              {/* Account 2: Restricted Personal Domain */}
              <TouchableOpacity
                style={styles.accountOption}
                onPress={() => handleSelect('example@gmail.com', 'Personal Gmail Account')}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Sign in with example@gmail.com"
              >
                <View style={[styles.avatar, { backgroundColor: '#EA4335' }]}>
                  <Text style={styles.avatarText}>G</Text>
                </View>
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>Personal Account</Text>
                  <Text style={styles.accountEmail}>example@gmail.com</Text>
                  <Text style={styles.restrictedTag}>✕ Restricted Domain (@gmail.com)</Text>
                </View>
              </TouchableOpacity>

              {/* Option 3: Custom Email Input */}
              {showCustomInput ? (
                <View style={styles.customInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter email (e.g. name@hbplus.fit)"
                    placeholderTextColor={Colors.mediumGray}
                    value={customEmail}
                    onChangeText={setCustomEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleCustomSubmit}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.submitButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.useAnotherButton}
                  onPress={() => setShowCustomInput(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.useAnotherText}>+ Use another email account</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Cancel Button */}
          {!loading && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 20,
    width: '100%',
    maxWidth: 420,
    padding: 24,
    elevation: 8,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  googleIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  googleLetter: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    gap: 12,
    marginBottom: 16,
  },
  accountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.offWhite,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  accountEmail: {
    fontSize: 13,
    color: Colors.mediumGray,
    marginTop: 1,
  },
  authorizedTag: {
    fontSize: 11,
    color: '#2E7D32',
    fontWeight: '700',
    marginTop: 2,
  },
  restrictedTag: {
    fontSize: 11,
    color: '#D32F2F',
    fontWeight: '700',
    marginTop: 2,
  },
  customInputContainer: {
    marginTop: 6,
  },
  input: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.charcoal,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: Colors.warmCoral,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.pureWhite,
    fontWeight: '700',
    fontSize: 14,
  },
  useAnotherButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  useAnotherText: {
    color: Colors.warmCoral,
    fontWeight: '700',
    fontSize: 13,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelText: {
    color: Colors.mediumGray,
    fontWeight: '600',
    fontSize: 13,
  },
});
