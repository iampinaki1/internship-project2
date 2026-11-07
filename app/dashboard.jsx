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

export default function DashboardScreen() {
  // useAuth is a regular function — no optional chaining needed.
  const { user, logout } = useAuth();
  const { width, height } = useWindowDimensions();
  const isTabletOrDesktop = Math.min(width, height) >= 600 || width >= 768;
  const cardWidth = Math.min(width * 0.92, isTabletOrDesktop ? 440 : 380);

  const displayName = user?.name || 'HB+ Intern';
  const displayEmail = user?.email || '';
  const displayRole = user?.role || 'User';
  const isAdmin = displayRole === 'Admin';

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

        {/* Role Badge */}
        <View style={[styles.roleBadge, isAdmin && styles.roleBadgeAdmin]}>
          <Text style={[styles.roleBadgeText, isAdmin && styles.roleBadgeTextAdmin]}>
            {isAdmin ? '⭐ Admin' : '👤 User'}
          </Text>
        </View>

        {/* Profile Card Box */}
        <View style={styles.profileBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{displayName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue} numberOfLines={1} ellipsizeMode="tail">
              {displayEmail}
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.detailLabel}>Role</Text>
            <Text style={[styles.detailValue, isAdmin && styles.detailValueAdmin]}>
              {displayRole}
            </Text>
          </View>
        </View>

        {/* Sign Out */}
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
  roleBadge: {
    backgroundColor: Colors.offWhite,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#903c2d',
  },
  roleBadgeAdmin: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFD54F',
  },
  roleBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.mediumGray,
    letterSpacing: 0.3,
  },
  roleBadgeTextAdmin: {
    color: '#B8860B',
  },
  profileBox: {
    width: '100%',
    backgroundColor: Colors.offWhite,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#c82d2d',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: Colors.charcoal,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },
  detailValueAdmin: {
    color: '#B8860B',
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
