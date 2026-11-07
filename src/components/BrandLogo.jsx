import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export const BrandLogo = ({ size = 'medium' }) => {
  const isLarge = size === 'large';

  return (
    <View style={styles.container}>
      <View style={[styles.badge, isLarge && styles.badgeLarge]}>
        <Text style={[styles.brandText, isLarge && styles.brandTextLarge]}>
          HB<Text style={styles.plusSymbol}>+</Text>
        </Text>
      </View>
      <Text style={[styles.tagline, isLarge && styles.taglineLarge]}>
        Fitness & Health
      </Text>
      <Text style={styles.subTagline}>
        Secure Single Sign-On
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: Colors.warmCoral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  badgeLarge: {
    width: 88,
    height: 88,
    borderRadius: 26,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '900',
    color: Colors.pureWhite,
    letterSpacing: -0.5,
  },
  brandTextLarge: {
    fontSize: 38,
  },
  plusSymbol: {
    color: Colors.charcoal,
  },
  tagline: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
    letterSpacing: -0.3,
  },
  taglineLarge: {
    fontSize: 26,
  },
  subTagline: {
    fontSize: 13,
    color: Colors.mediumGray,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default BrandLogo;

