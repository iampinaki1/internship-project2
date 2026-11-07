import React, { useState } from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';
import GetStartedScreen from './get-started';
import LoginScreen from './index';
import ProfileScreen from './dashboard';

const initialMetrics = Platform.OS === 'web' ? {
  frame: {
    x: 0,
    y: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 375,
    height: typeof window !== 'undefined' ? window.innerHeight : 812,
  },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
} : undefined;

function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('get-started'); // 'get-started' | 'login'

  // If user is authenticated, render the profile
  if (isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.softPeach} />
        <ProfileScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.softPeach} />
      {currentScreen === 'get-started' ? (
        <GetStartedScreen onGetStarted={() => setCurrentScreen('login')} />
      ) : (
        <LoginScreen onBack={() => setCurrentScreen('get-started')} />
      )}
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics} style={styles.provider}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.softPeach,
  },
});
