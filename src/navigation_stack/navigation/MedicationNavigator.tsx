import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MedicationListScreen } from '@/features/medication/screens/MedicationListScreen';
import { AddMedicationScreen } from '@/features/medication/screens/AddMedicationScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { CalendarScreen } from '@/features/calendar/screens/CalendarScreen';
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen';
import { ProfileScreen } from '@/features/profile/screens/ProfileScreen';
import { AppointmentListScreen } from '@/features/appointment/screens/AppointmentListScreen';
import { AddAppointmentScreen } from '@/features/appointment/screens/AddAppointmentScreen';

export type MedicationStackParamList = {
  Home: undefined;
  Calendar: undefined;
  MedicationList: undefined;
  AddMedication: undefined;
  Settings: undefined;
  Profile: undefined;
  AppointmentList: undefined;
  AddAppointment: undefined;
};

const Stack = createNativeStackNavigator<MedicationStackParamList>();

export function MedicationNavigator() {
  console.log('[MEDICATION_NAVIGATOR] Component rendering');
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
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='AppointmentList' component={AppointmentListScreen} />
      <Stack.Screen name='AddAppointment' component={AddAppointmentScreen} />
    </Stack.Navigator>
  );
}
