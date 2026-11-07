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
import { useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';

export default function DashboardScreen() {
  const { user, logout } = useAuth?.() || {};
  const { width } = useWindowDimensions();
  const isTabletOrDesktop = width >= 600;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.container,
        isTabletOrDesktop && styles.containerDesktop,
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <View style={styles.card}>
        {/* Workspace Header */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>
            HB<Text style={styles.brandPlus}>+</Text> Workspace
          </Text>
          <Text style={styles.welcomeText}>
            Welcome, <Text style={styles.userName}>{user?.name || 'Intern'}</Text>
          </Text>
        </View>

        {/* User Account Card */}
        <View style={styles.accountBox}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{user?.email || 'intern@hbplus.com'}</Text>
          </View>
          {user?.domain && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Domain</Text>
              <Text style={styles.detailValue}>{user.domain}</Text>
            </View>
          )}
        </View>

        {/* Sign Out Action */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Sign Out"
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        HB+ Platform • Web & Mobile
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  containerDesktop: {
    paddingVertical: 40,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: Colors.pureWhite,
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 24,
    elevation: 4,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
    fontSize: 15,
    color: Colors.mediumGray,
    marginTop: 4,
    fontWeight: '500',
  },
  userName: {
    color: Colors.charcoal,
    fontWeight: '700',
  },
  accountBox: {
    backgroundColor: Colors.offWhite,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.charcoal,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
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
    ...(Platform.OS === 'web' ? { cursor: 'pointer', userSelect: 'none' } : {}),
  },
  logoutText: {
    color: Colors.pureWhite,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  footerText: {
    marginTop: 14,
    fontSize: 11,
    color: Colors.mediumGray,
    textAlign: 'center',
  },
});
