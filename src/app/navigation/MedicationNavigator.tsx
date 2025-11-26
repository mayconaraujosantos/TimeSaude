import { createStackNavigator } from '@react-navigation/stack';
import { MedicationListScreen } from '@/features/medication/screens/MedicationListScreen';
import { AddMedicationScreen } from '@/features/medication/screens/AddMedicationScreen';

export type MedicationStackParamList = {
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
    >
      <Stack.Screen name='MedicationList' component={MedicationListScreen} />
      <Stack.Screen name='AddMedication' component={AddMedicationScreen} />
    </Stack.Navigator>
  );
}
