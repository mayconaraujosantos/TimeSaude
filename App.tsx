import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import { MedicationNavigator } from '@/app/navigation/MedicationNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MedicationNavigator />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
