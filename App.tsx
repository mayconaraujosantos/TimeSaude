import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function App() {
  return (
    <View className='flex-1 bg-white items-center justify-center'>
      <Text className='text-xl font-bold text-blue-600'>TimeSaúde - Medication Reminder App</Text>
      <Text className='text-gray-600 mt-4 text-center px-4'>
        Open up App.tsx to start working on your app with NativeWind!
      </Text>
      <StatusBar style='auto' />
    </View>
  );
}
