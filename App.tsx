import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { MedicationNavigator } from '@/navigation_stack/navigation/MedicationNavigator';
import { AuthProvider } from '@/shared/contexts/AuthContext';
import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import { ThemedStatusBar } from '@/shared/components/ThemedStatusBar';

export default function App() {
  console.log('[APP.TSX] App component rendering');
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer
            onReady={() => console.log('[APP.TSX] NavigationContainer ready')}
            onStateChange={state =>
              console.log('[APP.TSX] Navigation state changed:', state?.routes[state.index]?.name)
            }
          >
            <MedicationNavigator />
            <ThemedStatusBar />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
