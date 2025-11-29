import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MedicationStackParamList } from '@/app/navigation/MedicationNavigator';
import { DateSelector, DateItem } from '@/shared/components/molecules/DateSelector';

type NavigationProp = StackNavigationProp<MedicationStackParamList, 'MedicationList'>;

export function MedicationListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleDateSelect = (_date: DateItem) => {
    // Handle date selection - filter medications by selected date
    // TODO: Implement medication filtering logic
  };

  const upcomingDoses = [
    {
      id: 1,
      name: 'Naproxen Vitamin',
      dosage: '1 pill After Eat',
      time: '09:00 am',
      icon: '💊',
      color: '#FFB8B8',
    },
    {
      id: 2,
      name: 'Benzonatate Capsule',
      dosage: '1 Capsule After Eat',
      time: '09:00 am',
      icon: '💊',
      color: '#FF7E7E',
      active: true,
    },
    {
      id: 3,
      name: 'Naproxen Vitamin',
      dosage: '1 Capsule After Eat',
      time: '09:00 am',
      icon: '💊',
      color: '#FFB8B8',
    },
  ];

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='bg-white pt-12 pb-6 px-6 rounded-b-3xl'>
        <View className='flex-row justify-between items-start mb-6'>
          <View>
            <Text className='text-gray-500 text-sm'>Find Your Best</Text>
            <Text className='text-2xl font-bold text-gray-900'>Kamrul Hasan</Text>
          </View>
          <TouchableOpacity className='bg-white p-3 rounded-full shadow-sm'>
            <MaterialIcons name='notifications-none' size={24} color='#666' />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <DateSelector onDateSelect={handleDateSelect} daysToShow={7} />
      </View>

      {/* Content */}
      <ScrollView className='flex-1 px-6 pt-6'>
        {/* Section Header */}
        <View className='flex-row justify-between items-center mb-4'>
          <Text className='text-lg font-bold text-gray-900'>Upcoming Doses</Text>
          <TouchableOpacity className='bg-white px-4 py-2 rounded-full border border-gray-200'>
            <Text className='text-sm text-gray-600'>All ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Medication Cards */}
        <View className='gap-3'>
          {upcomingDoses.map(dose => (
            <View
              key={dose.id}
              className={`bg-white rounded-3xl p-4 flex-row items-center ${
                dose.active ? 'shadow-lg' : 'shadow-sm'
              }`}
            >
              <View
                className='w-14 h-14 rounded-2xl items-center justify-center mr-4'
                style={{ backgroundColor: dose.color }}
              >
                <Text className='text-3xl'>{dose.icon}</Text>
              </View>

              <View className='flex-1'>
                <Text className='text-xs text-gray-500 mb-1'>{dose.dosage}</Text>
                <Text className='text-base font-bold text-gray-900 mb-1'>{dose.name}</Text>
                <View className='flex-row items-center'>
                  <MaterialIcons name='access-time' size={14} color='#999' />
                  <Text className='text-xs text-gray-500 ml-1'>{dose.time}</Text>
                </View>
              </View>

              {dose.active && (
                <View className='bg-primary w-12 h-12 rounded-full items-center justify-center'>
                  <MaterialIcons name='check' size={24} color='white' />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className='bg-white px-8 py-4 flex-row justify-around items-center rounded-t-3xl shadow-lg'>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='home' size={28} color='#1a1a1a' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='insert-chart' size={28} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-primary w-14 h-14 rounded-full items-center justify-center -mt-8 shadow-lg'
          onPress={() => navigation.navigate('AddMedication')}
        >
          <MaterialIcons name='add' size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='settings' size={28} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='person-outline' size={28} color='#ccc' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
