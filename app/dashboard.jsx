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
import BrandLogo from '../src/components/BrandLogo';

export default function ProfileScreen() {
  const { user, logout } = useAuth?.() || {};
  const { width, height } = useWindowDimensions();
  const isTabletOrDesktop = Math.min(width, height) >= 600 || width >= 768;
  const cardWidth = Math.min(width * 0.92, isTabletOrDesktop ? 440 : 380);

  const displayName = user?.name || 'HB+ Intern';
  const displayEmail = user?.email || 'intern@hbplus.com';

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

        {/* Profile Card Box */}
        <View style={styles.profileBox}>
          <Text style={styles.sectionTitle}>Intern Profile</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{displayName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{displayEmail}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Role</Text>
            <Text style={styles.detailValue}>Software Engineer Intern</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Active</Text>
            </View>
          </View>
        </View>

        {/* High-Contrast Sign Out Button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            Platform.OS === 'web' && { cursor: 'pointer', userSelect: 'none' },
          ]}
          onPress={logout}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Sign Out"
        >
          <Text style={styles.logoutButtonText}>Sign Out</Text>
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
    paddingVertical: 32,
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
  profileBox: {
    width: '100%',
    backgroundColor: Colors.offWhite,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.charcoal,
    marginBottom: 14,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 13,
    color: Colors.charcoal,
    fontWeight: '700',
  },
  statusBadge: {
    backgroundColor: Colors.pastelLavender,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.charcoal,
  },
  logoutButton: {
    backgroundColor: Colors.warmCoral,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
  logoutButtonText: {
    color: Colors.pureWhite,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
