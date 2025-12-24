import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'system';
type ActualTheme = 'light' | 'dark';

interface ThemeContextData {
  theme: Theme;
  actualTheme: ActualTheme;
  setTheme: (theme: Theme) => Promise<void>;
  colors: typeof lightColors;
}

const THEME_STORAGE_KEY = '@timesaude:theme';

// Definição de cores para tema claro
export const lightColors = {
  // Cores primárias
  primary: '#7B5FFF',
  primaryDark: '#6347E8',
  secondary: '#FF6B9D',
  accent: '#FFB800',

  // Backgrounds
  background: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',

  // Cards
  cardLight: '#F8F7FF',
  cardPurple: '#E8E1FF',
  cardPink: '#FFE1EE',
  cardBlue: '#D4E7FF',

  // Textos
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Bordas
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Estados
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
};

// Definição de cores para tema escuro
export const darkColors = {
  // Cores primárias
  primary: '#9B7FFF',
  primaryDark: '#7B5FFF',
  secondary: '#FF8BB5',
  accent: '#FFD233',

  // Backgrounds
  background: '#0F0F0F',
  surface: '#1A1A1A',
  surfaceVariant: '#252525',

  // Cards
  cardLight: '#252525',
  cardPurple: '#2D2440',
  cardPink: '#3D2230',
  cardBlue: '#1E2A3D',

  // Textos
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB',
  textLight: '#9CA3AF',
  textOnPrimary: '#FFFFFF',

  // Bordas
  border: '#374151',
  borderLight: '#252525',

  // Estados
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: '#000000',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');

  // Determina o tema atual baseado na configuração
  const actualTheme: ActualTheme =
    theme === 'system' ? (systemTheme === 'dark' ? 'dark' : 'light') : theme;

  const colors = actualTheme === 'dark' ? darkColors : lightColors;

  // Carrega o tema salvo
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (
        savedTheme &&
        (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')
      ) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
