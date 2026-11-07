import React from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import Colors from '../src/constants/colors';
import GetStartedScreen from './get-started';
import LoginScreen from './index';
import DashboardScreen from './dashboard';

const Stack = createNativeStackNavigator();

const initialMetrics = Platform.OS === 'web' ? {
  frame: {
    x: 0,
    y: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 375,
    height: typeof window !== 'undefined' ? window.innerHeight : 812,
  },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
} : undefined;

function RootNavigator() {
  const { isAuthenticated } = useAuth();

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
          // Protected Route: Only accessible when user is logged in
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
});
