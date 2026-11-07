import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';
import GetStartedScreen from './get-started';
import LoginScreen from './index';
import DashboardScreen from './dashboard';

function AppNavigator() {
  const { isAuthenticated } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('get-started'); // 'get-started' | 'login'

  // If user is authenticated, render the dashboard
  if (isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.softPeach} />
        <DashboardScreen />
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
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softPeach,
  },
});
