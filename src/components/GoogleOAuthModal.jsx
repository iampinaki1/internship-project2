import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/colors';

export default function GoogleOAuthModal({
  visible,
  onClose,
  onSelectAccount,
  loading = false,
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email.trim()) {
      onSelectAccount(email.trim());
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
            <Text style={styles.title}>Google Sign-In</Text>
            <Text style={styles.subtitle}>Enter your official Google email address</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.warmCoral} />
              <Text style={styles.loadingText}>Signing in...</Text>
            </View>
          ) : (
            <View style={styles.content}>
              <TextInput
                style={styles.input}
                placeholder="name@hbplus.fit"
                placeholderTextColor={Colors.mediumGray}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                autoFocus
              />

              <TouchableOpacity
                style={[styles.submitButton, !email.trim() && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!email.trim()}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Sign in with Google"
              >
                <Text style={styles.submitButtonText}>Continue with Google</Text>
              </TouchableOpacity>
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
    maxWidth: 400,
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
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.charcoal,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: Colors.warmCoral,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.pureWhite,
    fontWeight: '700',
    fontSize: 15,
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
