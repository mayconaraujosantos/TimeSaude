import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../hooks/useTheme';

/**
 * StatusBar que se adapta automaticamente ao tema atual
 */
export function ThemedStatusBar() {
  const { actualTheme } = useTheme();

  return <StatusBar style={actualTheme === 'dark' ? 'light' : 'dark'} />;
}
