import { createStackNavigator } from '@react-navigation/stack';
import { MedicationListScreen } from '@/features/medication/screens/MedicationListScreen';
import { AddMedicationScreen } from '@/features/medication/screens/AddMedicationScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { CalendarScreen } from '@/features/calendar/screens/CalendarScreen';

export type MedicationStackParamList = {
  Home: undefined;
  Calendar: undefined;
  MedicationList: undefined;
  AddMedication: undefined;
};

const Stack = createStackNavigator<MedicationStackParamList>();

export function MedicationNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Calendar' component={CalendarScreen} />
      <Stack.Screen name='MedicationList' component={MedicationListScreen} />
      <Stack.Screen name='AddMedication' component={AddMedicationScreen} />
    </Stack.Navigator>
  );
}
