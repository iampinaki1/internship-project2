import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import Colors from '../src/constants/colors';
import BrandLogo from '../src/components/BrandLogo';

export default function GetStartedScreen({ onGetStarted }) {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const isLandscape = width > height;
  const containerWidth = Math.min(width * 0.92, isTablet ? 520 : 400);

  const features = [
    {
      title: 'Seamless Onboarding',
      desc: 'Access your tasks, resources, and internship roadmap in one unified workspace.',
      bgColor: Colors.pastelLavender,
      tag: '01',
    },
    {
      title: 'Track Performance & Goals',
      desc: 'Real-time milestones, feedback loops, and progress monitoring.',
      bgColor: Colors.lightPeach,
      tag: '02',
    },
    {
      title: 'Institutional Single Sign-On',
      desc: 'Sign in effortlessly using your authenticated organization Google account.',
      bgColor: Colors.pureWhite,
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
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { width: containerWidth }]}>
        {/* Brand Header */}
        <BrandLogo size={isTablet ? 'large' : 'medium'} />

        {/* Welcome Tagline */}
        <View style={styles.introBox}>
          <Text style={styles.headline}>
            Empowering Your Internship Journey
          </Text>
          <Text style={styles.subheadline}>
            The official digital hub for interns at HB+. Everything you need to succeed, all in one place.
          </Text>
        </View>

        {/* Feature Highlights */}
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
              <Text style={styles.featureDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        {/* Primary Call to Action */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Get Started"
        >
          <Text style={styles.getStartedButtonText}>Get Started →</Text>
        </TouchableOpacity>

        {/* Supporting Hint */}
        <Text style={styles.loginHint}>
          Requires an authorized organization account
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
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
    paddingVertical: 36,
    paddingHorizontal: 16,
  },
  scrollContentLandscape: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  introBox: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subheadline: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresList: {
    width: '100%',
    marginBottom: 24,
  },
  featureCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    elevation: 1,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureTag: {
    backgroundColor: Colors.charcoal,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
  },
  featureTagText: {
    color: Colors.pureWhite,
    fontSize: 10,
    fontWeight: '800',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.charcoal,
    flex: 1,
  },
  featureDesc: {
    fontSize: 13,
    color: Colors.charcoal,
    lineHeight: 18,
    opacity: 0.85,
  },
  getStartedButton: {
    backgroundColor: Colors.warmCoral,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  getStartedButtonText: {
    color: Colors.pureWhite,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  loginHint: {
    marginTop: 12,
    fontSize: 12,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
});
