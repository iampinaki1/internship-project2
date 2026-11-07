import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';

export default function DashboardScreen() {
  const { user, logout } = useAuth?.() || {};
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.container, isTablet && styles.containerTablet]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Top App Bar / Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>HB<Text style={styles.brandPlus}>+</Text> Workspace</Text>
          <Text style={styles.welcomeText}>
            Welcome back, <Text style={styles.userName}>{user?.name || 'Intern User'}</Text>
          </Text>
        </View>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: Colors.pureWhite }]}>
          <Text style={styles.metricNumber}>100%</Text>
          <Text style={styles.metricLabel}>Onboarding</Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: Colors.pastelLavender }]}>
          <Text style={styles.metricNumber}>React Native</Text>
          <Text style={styles.metricLabel}>Track</Text>
        </View>
      </View>

      {/* Recent Activity Card */}
      <View style={styles.activityCard}>
        <Text style={styles.cardTag}>Recent Milestone</Text>
        <Text style={styles.cardHeading}>Environment Setup & Login UI</Text>
        <Text style={styles.cardBody}>
          Pure JSX build verified, live Fast Refresh active, responsive design enabled.
        </Text>
      </View>

      {/* Profile & Account Card */}
      <View style={styles.surfaceCard}>
        <Text style={styles.surfaceTitle}>Account Information</Text>
        <Text style={styles.surfaceDetail}>
          Email: <Text style={styles.detailValue}>{user?.email || 'intern@hbplus.com'}</Text>
        </Text>
        <Text style={styles.surfaceDetail}>
          Role: <Text style={styles.detailValue}>Mobile Development Intern</Text>
        </Text>
      </View>

      {/* Prominent High-Contrast Sign Out Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Sign Out"
      >
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        HB+ Platform • Session Authenticated
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'stretch',
  },
  containerTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.charcoal,
    letterSpacing: -0.5,
  },
  brandPlus: {
    color: Colors.warmCoral,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 2,
    fontWeight: '500',
  },
  userName: {
    color: Colors.charcoal,
    fontWeight: '700',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 93, 78, 0.12)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.warmCoral,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.warmCoral,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontWeight: '600',
    marginTop: 2,
  },
  activityCard: {
    backgroundColor: Colors.pastelLavender,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardTag: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: Colors.darkTaupe,
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 13,
    color: Colors.charcoal,
    lineHeight: 18,
    opacity: 0.9,
  },
  surfaceCard: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  surfaceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 8,
  },
  surfaceDetail: {
    fontSize: 13,
    color: Colors.mediumGray,
    marginBottom: 4,
  },
  detailValue: {
    color: Colors.charcoal,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Colors.warmCoral,
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
  logoutText: {
    color: Colors.pureWhite,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  footerText: {
    marginTop: 12,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});
