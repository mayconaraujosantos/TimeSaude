import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';

type NavigationProp = StackNavigationProp<MedicationStackParamList>;

export function CalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDay, setSelectedDay] = useState(22);

  const weekDays = [
    { day: 20, weekDay: 'Mon' },
    { day: 21, weekDay: 'Tues' },
    { day: 22, weekDay: 'Wed' },
    { day: 23, weekDay: 'Turs' },
    { day: 24, weekDay: 'Fri' },
  ];

  const timeSlots = [
    { time: '08:00', medication: null },
    {
      time: '09:00',
      medication: {
        name: 'Vitamin B12',
        instruction: 'take on empty stomach',
        checked: true,
        color: '#E8E1FF',
      },
    },
    {
      time: '10:00',
      medication: {
        name: 'Omega 3',
        instruction: 'take before eat',
        checked: false,
        color: '#F8F7FF',
      },
    },
    {
      time: '11:00',
      medication: {
        name: 'Vitamin A',
        instruction: 'take before eat',
        checked: false,
        color: '#F8F7FF',
      },
    },
    { time: '12:00', medication: null },
  ];

  return (
    <View className='flex-1' style={{ backgroundColor: '#F0EBFF' }}>
      <ScrollView className='flex-1'>
        {/* Header */}
        <View className='bg-white/60 rounded-b-[40px] px-6 pt-16 pb-6'>
          <View className='flex-row justify-between items-center mb-6'>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='w-10 h-10 items-center justify-center'
            >
              <MaterialIcons name='arrow-back-ios' size={20} color='#7B5FFF' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold' style={{ color: '#7B5FFF' }}>
              Calendar
            </Text>
            <TouchableOpacity className='w-10 h-10 items-center justify-center'>
              <MaterialIcons name='menu' size={28} color='#7B5FFF' />
            </TouchableOpacity>
          </View>

          {/* Month/Year */}
          <Text className='text-sm mb-5' style={{ color: '#9CA3AF' }}>
            June 2022
          </Text>

          {/* Week Days Selector */}
          <View className='flex-row justify-between gap-2'>
            {weekDays.map(item => (
              <TouchableOpacity
                key={item.day}
                onPress={() => setSelectedDay(item.day)}
                className='flex-1 items-center rounded-[20px] py-3'
                style={{
                  backgroundColor: selectedDay === item.day ? '#7B5FFF' : '#FFFFFF',
                  shadowColor: selectedDay === item.day ? '#7B5FFF' : '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: selectedDay === item.day ? 0.25 : 0.05,
                  shadowRadius: 8,
                  elevation: selectedDay === item.day ? 8 : 2,
                }}
              >
                <Text
                  className='text-2xl font-bold mb-1'
                  style={{ color: selectedDay === item.day ? '#FFFFFF' : '#1A1A1A' }}
                >
                  {item.day}
                </Text>
                <Text
                  className='text-xs'
                  style={{ color: selectedDay === item.day ? '#FFFFFF' : '#9CA3AF' }}
                >
                  {item.weekDay}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timeline with purple slider */}
        <View className='px-6 pt-8 relative'>
          {/* Time slider indicator - purple vertical line */}
          <View
            className='absolute left-[4.5rem] rounded-full'
            style={{
              top: 160,
              width: 6,
              height: 120,
              backgroundColor: '#7B5FFF',
              zIndex: 10,
            }}
          />

          {timeSlots.map(slot => (
            <View key={slot.time} className='flex-row mb-6'>
              {/* Time */}
              <View className='w-20 pt-1'>
                <Text className='text-base font-medium' style={{ color: '#1A1A1A' }}>
                  {slot.time}
                </Text>
              </View>

              {/* Medication Card or Empty Space */}
              <View className='flex-1'>
                {slot.medication ? (
                  <View
                    className='rounded-[24px] p-4 flex-row items-center justify-between'
                    style={{
                      backgroundColor: slot.medication.color,
                      shadowColor: '#7B5FFF',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.08,
                      shadowRadius: 12,
                      elevation: 4,
                    }}
                  >
                    <View className='flex-row items-center gap-3 flex-1'>
                      <View
                        className='w-12 h-12 rounded-[16px] items-center justify-center'
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <Text className='text-2xl'>💊</Text>
                      </View>
                      <View className='flex-1'>
                        <Text className='text-base font-bold mb-1' style={{ color: '#1A1A1A' }}>
                          {slot.medication.name}
                        </Text>
                        <Text className='text-xs' style={{ color: '#6B7280' }}>
                          {slot.medication.instruction}
                        </Text>
                      </View>
                    </View>

                    <View className='flex-row items-center gap-3'>
                      {slot.medication.checked && (
                        <View
                          className='w-6 h-6 rounded-lg items-center justify-center'
                          style={{ backgroundColor: '#7B5FFF' }}
                        >
                          <MaterialIcons name='check' size={16} color='#FFFFFF' />
                        </View>
                      )}
                      <TouchableOpacity className='p-1'>
                        <MaterialIcons name='more-vert' size={20} color='#6B7280' />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={{ height: 56 }} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className='h-28' />
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className='absolute bottom-0 left-0 right-0 rounded-t-[32px]'
        style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <View className='flex-row items-center justify-around px-8' style={{ height: 80 }}>
          <TouchableOpacity
            className='items-center justify-center w-14 h-14'
            onPress={() => navigation.navigate('Home')}
          >
            <MaterialIcons name='home' size={32} color='#9CA3AF' />
          </TouchableOpacity>

          <TouchableOpacity
            className='items-center justify-center rounded-full -mt-10'
            style={{
              width: 64,
              height: 64,
              backgroundColor: '#7B5FFF',
              shadowColor: '#7B5FFF',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
            onPress={() => navigation.navigate('AddMedication')}
          >
            <MaterialIcons name='add' size={36} color='#FFFFFF' />
          </TouchableOpacity>

          <TouchableOpacity className='items-center justify-center w-14 h-14'>
            <MaterialIcons name='calendar-today' size={28} color='#7B5FFF' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
