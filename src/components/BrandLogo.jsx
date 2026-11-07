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
      <Text style={styles.subTagline}>
        Healthcare & Benefits Workspace
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: Colors.warmCoral,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 6,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  badgeLarge: {
    width: 80,
    height: 80,
    borderRadius: 24,
  },
  brandText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.pureWhite,
    letterSpacing: -0.5,
  },
  brandTextLarge: {
    fontSize: 34,
  },
  plusSymbol: {
    color: Colors.charcoal,
    fontWeight: '900',
  },
  subTagline: {
    fontSize: 13,
    color: Colors.mediumGray,
    marginTop: 3,
    fontWeight: '600',
  },
});

export default BrandLogo;
