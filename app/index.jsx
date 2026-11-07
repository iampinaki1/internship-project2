import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../src/constants/colors';
import BrandLogo from '../src/components/BrandLogo';
import GoogleLoginButton from '../src/components/GoogleLoginButton';
import ErrorMessage from '../src/components/ErrorMessage';
import GoogleOAuthModal from '../src/components/GoogleOAuthModal';
import { useAuth } from '../src/context/AuthContext';

export default function LoginScreen({ navigation, onBack }) {
  const { width, height } = useWindowDimensions();
  const { loginWithGoogle, authError, clearAuthError } = useAuth?.() || {};

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showOAuthModal, setShowOAuthModal] = useState(false);

  const isTabletOrDesktop = Math.min(width, height) >= 600 || width >= 768;
  const cardWidth = Math.min(width * 0.92, isTabletOrDesktop ? 440 : 380);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  const handleOpenGoogleSignIn = () => {
    setErrorMessage('');
    clearAuthError?.();
    setShowOAuthModal(true);
  };

  const handleSelectAccount = async (email, name) => {
    setLoading(true);
    setErrorMessage('');

    try {
      await loginWithGoogle?.(email, name);
      setShowOAuthModal(false);
    } catch (err) {
      setShowOAuthModal(false);
      setErrorMessage(
        err?.message || 'Access restricted. Please login using your official domain email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const displayError = errorMessage || authError;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={handleBack}
            style={[
              styles.backButton,
              Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="Go Back"
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          {/* HB+ Branding */}
          <BrandLogo size={isTabletOrDesktop ? 'large' : 'medium'} />

          {/* Error Message Area */}
          <ErrorMessage
            message={displayError}
            onDismiss={() => {
              setErrorMessage('');
              clearAuthError?.();
            }}
          />

          {/* Google Sign In Button */}
          <View style={styles.actionContainer}>
            <GoogleLoginButton
              onPress={handleOpenGoogleSignIn}
              loading={loading}
              title="Sign in with Google"
            />
          </View>
        </View>
      </ScrollView>

      {/* Google OAuth Account Picker Modal */}
      <GoogleOAuthModal
        visible={showOAuthModal}
        onClose={() => setShowOAuthModal(false)}
        onSelectAccount={handleSelectAccount}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
  },
  actionContainer: {
    width: '100%',
    marginTop: 8,
  },
});
