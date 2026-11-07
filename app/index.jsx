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

  const isLandscape = width > height;
  const isTabletOrDesktop = Math.min(width, height) >= 600 || width >= 768;
  const cardWidth = Math.min(width * 0.92, isTabletOrDesktop ? 440 : 380);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { width: cardWidth }]}>
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={[
                styles.backButton,
                Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
              ]}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}

          {/* HB+ Branding */}
          <BrandLogo size={isTabletOrDesktop ? 'large' : 'medium'} />

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
              Please sign in using your official organizational email.
            </Text>
          </View>

          {/* Error Simulation Link */}
          <TouchableOpacity
            onPress={handleSimulateError}
            style={[
              styles.helpLink,
              Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.helpLinkText}>Need help signing in?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} HB+ Platform • All rights reserved
        </Text>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  scrollContainerLandscape: {
    paddingVertical: 12,
  },
  card: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 26,
    paddingHorizontal: 22,
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
    marginBottom: 6,
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
    marginTop: 4,
  },
  infoBox: {
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 16,
  },
  helpLink: {
    marginTop: 10,
  },
  helpLinkText: {
    fontSize: 12,
    color: Colors.darkTaupe,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footerText: {
    marginTop: 14,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});
