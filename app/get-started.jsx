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
  const isLandscape = width > height;

  const features = [
    {
      title: 'Unified Onboarding',
      desc: 'Roadmaps, assigned tasks, and intern resources.',
      bgColor: Colors.pastelLavender,
      tag: '01',
    },
    {
      title: 'Track Performance',
      desc: 'Milestones, project feedback, and progress analytics.',
      bgColor: Colors.lightPeach,
      tag: '02',
    },
    {
      title: 'Secure Google SSO',
      desc: 'Instant access with your verified organizational email.',
      bgColor: Colors.offWhite,
      tag: '03',
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.scrollContent,
        isLandscape && styles.scrollContentLandscape,
      ]}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.mainWrapper, isTabletOrDesktop && styles.mainWrapperDesktop]}>
        <View style={styles.card}>
          {/* Brand Header */}
          <BrandLogo size={isTabletOrDesktop ? 'large' : 'medium'} />

          {/* Value Proposition */}
          <View style={styles.introBox}>
            <Text style={styles.headline}>
              Empowering Your Internship
            </Text>
            <Text style={styles.subheadline}>
              Your centralized workspace for daily tracking, mentorship, and deliverables at HB+.
            </Text>
          </View>

          {/* Feature Badges */}
          <View style={styles.featuresList}>
            {features.map((item, index) => (
              <View
                key={index}
                style={[styles.featureCard, { backgroundColor: item.bgColor }]}
              >
                <View style={styles.featureHeader}>
                  <View style={styles.featureTag}>
                    <Text style={styles.featureTagText}>{item.tag}</Text>
                  </View>
                  <Text style={styles.featureTitle}>{item.title}</Text>
                </View>
                <Text style={styles.featureDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>

          {/* Prominent High-Contrast Get Started Button */}
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

          <Text style={styles.loginHint}>
            Single Sign-On for Authorized Personnel
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          HB+ Platform • Version 1.0.0
        </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollContentLandscape: {
    paddingVertical: 16,
  },
  mainWrapper: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  mainWrapperDesktop: {
    maxWidth: 460,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  introBox: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subheadline: {
    fontSize: 13,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  featuresList: {
    width: '100%',
    marginBottom: 18,
  },
  featureCard: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  featureTag: {
    backgroundColor: Colors.charcoal,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginRight: 8,
  },
  featureTagText: {
    color: Colors.pureWhite,
    fontSize: 9,
    fontWeight: '800',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.charcoal,
    flex: 1,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.charcoal,
    lineHeight: 16,
    opacity: 0.8,
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
  loginHint: {
    marginTop: 8,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 10,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});
