import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import Colors from '../src/constants/colors';
import BrandLogo from '../src/components/BrandLogo';

export default function GetStartedScreen({ onGetStarted }) {
  const { width, height } = useWindowDimensions();
  const isTabletOrDesktop = Math.min(width, height) >= 600 || width >= 768;
  const cardWidth = Math.min(width * 0.92, isTabletOrDesktop ? 440 : 380);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { width: cardWidth }]}>
        {/* HB+ Brand Logo */}
        <BrandLogo size={isTabletOrDesktop ? 'large' : 'medium'} />

        {/* Welcome Text */}
        <Text style={styles.title}>Welcome to HB+</Text>
        <Text style={styles.subtitle}>
          Healthcare & Benefits Intern Portal
        </Text>

        {/* High-Contrast Get Started Button */}
        <TouchableOpacity
          style={[
            styles.getStartedButton,
            Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
          ]}
          onPress={onGetStarted}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Get Started"
        >
          <Text style={styles.getStartedButtonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 36,
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    marginBottom: 28,
  },
  getStartedButton: {
    backgroundColor: Colors.warmCoral,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  getStartedButtonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
