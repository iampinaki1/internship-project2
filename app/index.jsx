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
import { useAuth } from '../src/context/AuthContext';

export default function LoginScreen({ onBack }) {
  const { width, height } = useWindowDimensions();
  const { login } = useAuth?.() || {};

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Responsive calculations
  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;
  const cardWidth = Math.min(width * 0.9, isTablet ? 480 : 380);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Simulate OAuth flow (can be hooked to real Firebase / Google OAuth)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Success payload
      login?.({
        email: 'intern@hbplus.com',
        name: 'HB+ Intern',
        domain: 'hbplus.com',
      });
    } catch (err) {
      setErrorMessage(
        err?.message || 'Unable to sign in with Google. Please check your network and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateError = () => {
    setErrorMessage('Domain verification failed. Only @hbplus.com accounts are permitted.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.scrollContainerLandscape,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          {/* Back button if available */}
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}

          {/* HB+ Branding */}
          <BrandLogo size={isTablet ? 'large' : 'medium'} />

          {/* Error Message Area */}
          <ErrorMessage
            message={errorMessage}
            onDismiss={() => setErrorMessage('')}
          />

          {/* Action Area */}
          <View style={styles.actionContainer}>
            <GoogleLoginButton
              onPress={handleGoogleLogin}
              loading={loading}
              title="Sign in with Google"
            />
          </View>

          {/* Organizational Help & Domain Policy */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Please use your institutional or organization email to access your workspace.
            </Text>
          </View>

          {/* Error Simulation Link (For Review / Testing) */}
          <TouchableOpacity
            onPress={handleSimulateError}
            style={styles.helpLink}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.helpLinkText}>Need help signing in?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} HB+ Platform • All rights reserved
          </Text>
        </View>
      </ScrollView>
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
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  scrollContainerLandscape: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 28,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    position: 'relative',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.charcoal,
  },
  actionContainer: {
    width: '100%',
    marginTop: 4,
  },
  infoBox: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  helpLink: {
    marginTop: 14,
  },
  helpLinkText: {
    fontSize: 13,
    color: Colors.darkTaupe,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
});
