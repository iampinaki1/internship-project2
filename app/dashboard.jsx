import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';

export default function DashboardScreen() {
  const { user, logout } = useAuth?.() || {};

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.welcomeText}>
          Welcome back, <Text style={styles.userName}>{user?.name || 'test user'}</Text>
        </Text>
      </View>

      {/* Activity Card */}
      <View style={styles.activityCard}>
        <Text style={styles.cardTag}>Recent Activity</Text>
        <Text style={styles.cardHeading}>Meditation Section</Text>
        <Text style={styles.cardBody}>
          Finished
        </Text>
      </View>

      {/* Secondary Information Card */}
      <View style={styles.surfaceCard}>
        <Text style={styles.surfaceTitle}>Account Information</Text>
        <Text style={styles.surfaceDetail}>
          Email: {user?.email || 'me@organization.com'}
        </Text>
      </View>

      {/* Logout Action */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.charcoal,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.mediumGray,
    marginTop: 4,
  },
  userName: {
    color: Colors.charcoal,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: Colors.pastelLavender,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  cardTag: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.darkTaupe,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: Colors.charcoal,
    lineHeight: 20,
  },
  surfaceCard: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  surfaceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.charcoal,
    marginBottom: 8,
  },
  surfaceDetail: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  logoutButton: {
    backgroundColor: Colors.warmCoral,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: Colors.warmCoral,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoutText: {
    color: Colors.pureWhite,
    fontWeight: '700',
    fontSize: 16,
  },
});
