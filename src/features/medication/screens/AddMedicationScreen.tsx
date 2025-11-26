import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input } from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import { MedicationStackParamList } from '@/app/navigation/MedicationNavigator';

type NavigationProp = StackNavigationProp<MedicationStackParamList, 'AddMedication'>;

export function AddMedicationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [medicineName, setMedicineName] = useState('Loratadine, 10mg');
  const [whenToTake] = useState('Before Eatting');
  const [beginDate] = useState('Oct 2');
  const [finishDate] = useState('Oct 9');

  const dates = [
    { day: 28, label: 'Mon' },
    { day: 29, label: 'Tue', selected: true },
    { day: 29, label: 'Wed' },
    { day: 29, label: 'Thu' },
  ];

  return (
    <ScrollView className='flex-1 bg-gray-50'>
      {/* Header com botão voltar */}
      <View className='px-6 pt-12 pb-4'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='mb-4'>
          <MaterialIcons name='arrow-back' size={24} color='#1C1B1F' />
        </TouchableOpacity>
      </View>

      <View className='px-6 pb-8'>
        {/* Header Icon */}
        <View className='items-center mb-8'>
          <View className='relative'>
            <View className='w-32 h-32 rounded-full bg-primary/20 items-center justify-center'>
              <View className='w-24 h-24 rounded-full bg-primary items-center justify-center'>
                <MaterialIcons name='medical-services' size={48} color='white' />
              </View>
            </View>
            {/* Decorative circles */}
            <View className='absolute -top-4 -right-4 w-16 h-16 rounded-full bg-blue-200/50' />
            <View className='absolute -bottom-2 -left-6 w-20 h-20 rounded-full bg-yellow-200/50' />
          </View>
        </View>

        {/* Form */}
        <View className='gap-4'>
          {/* Medicine Name */}
          <View>
            <Text className='text-sm text-gray-600 mb-2'>Medicine Name</Text>
            <Input
              value={medicineName}
              onChangeText={setMedicineName}
              placeholder='Enter medicine name'
            />
          </View>

          {/* When to take */}
          <View>
            <Text className='text-sm text-gray-600 mb-2'>When to take</Text>
            <TouchableOpacity className='bg-white border border-gray-300 rounded-lg p-3 flex-row justify-between items-center'>
              <Text className='text-gray-900'>{whenToTake}</Text>
              <MaterialIcons name='keyboard-arrow-down' size={24} color='#666' />
            </TouchableOpacity>
          </View>

          {/* Date Range */}
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              <Text className='text-sm text-gray-600 mb-2'>Begin</Text>
              <TouchableOpacity className='bg-white border border-gray-300 rounded-lg p-3 flex-row justify-between items-center'>
                <Text className='text-gray-900'>{beginDate}</Text>
                <MaterialIcons name='keyboard-arrow-down' size={24} color='#666' />
              </TouchableOpacity>
            </View>
            <View className='flex-1'>
              <Text className='text-sm text-gray-600 mb-2'>Finish</Text>
              <TouchableOpacity className='bg-white border border-gray-300 rounded-lg p-3 flex-row justify-between items-center'>
                <Text className='text-gray-900'>{finishDate}</Text>
                <MaterialIcons name='keyboard-arrow-down' size={24} color='#666' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reminder Section */}
          <View>
            <Text className='text-lg font-bold text-gray-900 mb-3'>Reminder</Text>

            {/* Date Selector */}
            <View className='flex-row justify-between gap-2 mb-4'>
              {dates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-1 items-center py-3 rounded-full ${
                    date.selected ? 'bg-primary' : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xl font-bold ${
                      date.selected ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {date.day}
                  </Text>
                  <Text className={`text-xs ${date.selected ? 'text-white' : 'text-gray-500'}`}>
                    {date.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className='flex-row gap-3 mt-4'>
            <TouchableOpacity className='flex-1 bg-white border border-gray-300 rounded-full py-4 items-center'>
              <Text className='text-gray-900 font-medium'>Cycle</Text>
            </TouchableOpacity>
            <View className='flex-1'>
              <Button
                title='Get Started'
                variant='primary'
                onPress={() => console.log('Get Started')}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
