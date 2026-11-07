import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

export const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
      <View style={styles.content}>
        <Text style={styles.title}>Authentication Error</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {onDismiss && (
        <TouchableOpacity
          onPress={onDismiss}
          style={styles.dismissButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.dismissText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF0ED',
    borderWidth: 1,
    borderColor: Colors.warmCoral,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 4,
    height: '100%',
    minHeight: 28,
    backgroundColor: '#D9534F',
    borderRadius: 2,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D9534F',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 13,
    color: Colors.charcoal,
    lineHeight: 18,
  },
  dismissButton: {
    paddingLeft: 10,
    justifyContent: 'center',
  },
  dismissText: {
    fontSize: 16,
    color: Colors.mediumGray,
    fontWeight: '700',
  },
});

export default ErrorMessage;

