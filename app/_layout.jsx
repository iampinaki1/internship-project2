import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';
import GetStartedScreen from './get-started';
import LoginScreen from './index';
import DashboardScreen from './dashboard';

const Stack = createNativeStackNavigator();

const initialMetrics =
  Platform.OS === 'web'
    ? {
        frame: {
          x: 0,
          y: 0,
          width: typeof window !== 'undefined' ? window.innerWidth : 375,
          height: typeof window !== 'undefined' ? window.innerHeight : 812,
        },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }
    : undefined;

/**
 * A full-screen spinner shown while Firebase resolves the persisted session.
 * Without this, the app briefly flashes the login screen on every page reload
 * even for users who are already authenticated.
 */
function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.warmCoral} />
    </View>
  );
}

function RootNavigator() {
  const { isAuthenticated, initializing } = useAuth();

  // Block the navigator until Firebase finishes the session-restore check.
  // Only relevant on web — on mobile initializing is always false.
  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.softPeach },
          animation: 'fade',
        }}
      >
        {isAuthenticated ? (
          // Protected Route: only accessible when user is logged in.
          // When isAuthenticated is false this screen does not exist in the
          // navigator — direct URL access is blocked by route non-existence.
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          // Public Auth Routes
          <>
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider initialMetrics={initialMetrics} style={styles.provider}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.softPeach} />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.softPeach,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.softPeach,
  },
});
