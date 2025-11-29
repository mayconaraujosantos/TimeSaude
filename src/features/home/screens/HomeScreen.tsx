import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MedicationStackParamList } from '@/app/navigation/MedicationNavigator';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = StackNavigationProp<MedicationStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className='flex-1' style={{ backgroundColor: '#F0EBFF' }}>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='bg-white/60 backdrop-blur-xl rounded-b-[40px] px-6 pt-16 pb-6 mb-6'>
          <View className='flex-row justify-between items-start'>
            <View className='flex-row items-center gap-4'>
              {/* Avatar com gradiente */}
              <LinearGradient
                colors={['#FF6B9D', '#7B5FFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='w-14 h-14 rounded-full items-center justify-center'
              >
                <Text className='text-2xl'>👩</Text>
              </LinearGradient>
              <View>
                <Text className='text-2xl font-bold' style={{ color: '#1A1A1A' }}>
                  Hi Ana!
                </Text>
                <Text className='text-sm' style={{ color: '#6B7280' }}>
                  How do you feel today?
                </Text>
              </View>
            </View>
            <TouchableOpacity className='p-2'>
              <MaterialIcons name='menu' size={28} color='#7B5FFF' />
            </TouchableOpacity>
          </View>
        </View>

        <View className='px-6 gap-6'>
          {/* Your Next Pill */}
          <View>
            <Text className='text-xs mb-2' style={{ color: '#9CA3AF' }}>
              22 June
            </Text>
            <Text className='text-xl font-bold mb-4' style={{ color: '#1A1A1A' }}>
              Your Next Pill
            </Text>

            <View
              className='rounded-[32px] p-5 flex-row items-center justify-between'
              style={{
                backgroundColor: '#E8E1FF',
                shadowColor: '#7B5FFF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <View className='flex-row items-center gap-4 flex-1'>
                <View
                  className='w-14 h-14 rounded-[20px] items-center justify-center'
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <Text className='text-3xl'>💊</Text>
                </View>
                <View className='flex-1'>
                  <Text className='text-lg font-bold' style={{ color: '#1A1A1A' }}>
                    Omega 3
                  </Text>
                  <Text className='text-sm' style={{ color: '#6B7280' }}>
                    1 Pill take before eat
                  </Text>
                </View>
              </View>
              <TouchableOpacity className='p-2'>
                <MaterialIcons name='more-vert' size={24} color='#6B7280' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Your Next Appointment */}
          <View>
            <Text className='text-xl font-bold mb-4' style={{ color: '#1A1A1A' }}>
              Your Next Appointment
            </Text>

            <View
              className='rounded-[32px] p-5 flex-row items-center justify-between'
              style={{
                backgroundColor: '#D4E7FF',
                shadowColor: '#7B5FFF',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 16,
                elevation: 6,
              }}
            >
              <View className='flex-row items-center gap-4 flex-1'>
                <View
                  className='w-14 h-14 rounded-[20px] items-center justify-center'
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  <MaterialIcons name='event-note' size={28} color='#7B5FFF' />
                </View>
                <View className='flex-1'>
                  <Text className='text-lg font-bold' style={{ color: '#1A1A1A' }}>
                    Mammogram
                  </Text>
                  <Text className='text-sm' style={{ color: '#6B7280' }}>
                    Schedule the test
                  </Text>
                </View>
              </View>
              <View className='items-end'>
                <Text className='text-base font-bold' style={{ color: '#1A1A1A' }}>
                  1 July
                </Text>
                <Text className='text-sm' style={{ color: '#6B7280' }}>
                  10 am
                </Text>
              </View>
            </View>
          </View>

          {/* Your Cabinet */}
          <View>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-xl font-bold' style={{ color: '#1A1A1A' }}>
                Your Cabinet
              </Text>
              <TouchableOpacity className='flex-row items-center gap-1'>
                <Text className='text-sm font-medium' style={{ color: '#7B5FFF' }}>
                  View all
                </Text>
                <MaterialIcons name='arrow-forward' size={16} color='#7B5FFF' />
              </TouchableOpacity>
            </View>

            <View className='flex-row gap-4'>
              {/* Vitamin A Card */}
              <View
                className='flex-1 rounded-[32px] p-5'
                style={{
                  backgroundColor: '#E8E1FF',
                  shadowColor: '#7B5FFF',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <View className='flex-row justify-between items-start mb-4'>
                  <View
                    className='w-12 h-12 rounded-[16px] items-center justify-center'
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    <Text className='text-2xl'>💊</Text>
                  </View>
                  <TouchableOpacity className='p-1'>
                    <MaterialIcons name='more-vert' size={20} color='#6B7280' />
                  </TouchableOpacity>
                </View>
                <Text className='text-base font-bold mb-1' style={{ color: '#1A1A1A' }}>
                  Vitamin A
                </Text>
                <Text className='text-xs mb-2' style={{ color: '#6B7280' }}>
                  40 pills
                </Text>
                <Text className='text-xs' style={{ color: '#9CA3AF' }}>
                  take before eat
                </Text>
              </View>

              {/* Dimeticone Card */}
              <View
                className='flex-1 rounded-[32px] p-5'
                style={{
                  backgroundColor: '#FFE1EE',
                  shadowColor: '#FF6B9D',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <View className='flex-row justify-between items-start mb-4'>
                  <View
                    className='w-12 h-12 rounded-[16px] items-center justify-center'
                    style={{ backgroundColor: '#FFFFFF' }}
                  >
                    <Text className='text-2xl'>💊</Text>
                  </View>
                  <TouchableOpacity className='p-1'>
                    <MaterialIcons name='more-vert' size={20} color='#6B7280' />
                  </TouchableOpacity>
                </View>
                <Text className='text-base font-bold mb-1' style={{ color: '#1A1A1A' }}>
                  Dimeticone
                </Text>
                <Text className='text-xs mb-2' style={{ color: '#6B7280' }}>
                  25 pills
                </Text>
                <Text className='text-xs' style={{ color: '#9CA3AF' }}>
                  take After Lunch
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom spacing */}
          <View className='h-28' />
        </View>
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
          <TouchableOpacity className='items-center justify-center w-14 h-14'>
            <MaterialIcons name='home' size={32} color='#7B5FFF' />
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

          <TouchableOpacity
            className='items-center justify-center w-14 h-14'
            onPress={() => navigation.navigate('Calendar')}
          >
            <MaterialIcons name='calendar-today' size={28} color='#9CA3AF' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
