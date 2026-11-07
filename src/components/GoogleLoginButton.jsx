import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Colors from '../constants/colors';

/**
 * Standard Google 'G' Icon built with pure React Native primitives
 */
const GoogleIcon = () => (
  <View style={styles.iconCircle}>
    <Text style={styles.googleLetter}>G</Text>
  </View>
);

export const GoogleLoginButton = ({
  onPress,
  loading = false,
  disabled = false,
  title = 'Continue with Google',
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel="Sign in with Google"
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={Colors.warmCoral} />
          <Text style={styles.loadingText}>Authenticating...</Text>
        </View>
      ) : (
        <View style={styles.contentRow}>
          <GoogleIcon />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.65,
    backgroundColor: Colors.offWhite,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleLetter: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.charcoal,
    letterSpacing: 0.2,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.charcoal,
  },
});

export default GoogleLoginButton;
