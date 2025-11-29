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
  const [pillName, setPillName] = useState('');
  const [dose, _setDose] = useState('0.5');
  const [shape, _setShape] = useState('pill');
  const [time, _setTime] = useState({ hour: '11', minute: '30', period: 'AM' });
  const [howToUse, _setHowToUse] = useState({ days: '07', timing: 'Before eat' });

  const handleAddMedicine = () => {
    const medicationData = {
      pillName,
      dose,
      shape,
      time: `${time.hour}:${time.minute} ${time.period}`,
      howToUse: `${howToUse.days} days ${howToUse.timing}`,
    };

    // eslint-disable-next-line no-console
    console.log('New medication:', medicationData);
    navigation.goBack();
  };

  return (
    <View className='flex-1 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200'>
      <ScrollView className='flex-1'>
        {/* Header */}
        <View className='bg-white rounded-b-[40px] px-6 pt-14 pb-6'>
          <View className='flex-row justify-between items-center mb-6'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name='arrow-back' size={24} color='#1A1A1A' />
            </TouchableOpacity>
            <Text className='text-2xl font-bold text-primary'>Add Medicine</Text>
            <TouchableOpacity className='p-2'>
              <MaterialIcons name='menu' size={24} color='#1A1A1A' />
            </TouchableOpacity>
          </View>

          {/* Pill Icon */}
          <View className='items-center mt-4 mb-6'>
            <View className='relative'>
              {/* Decorative circles */}
              <View className='absolute -top-2 -right-2 w-12 h-12 rounded-full bg-yellow-200 opacity-50' />
              <View className='absolute -bottom-2 -left-3 w-16 h-16 rounded-full bg-pink-200 opacity-50' />

              {/* Main pill icon */}
              <View className='w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl items-center justify-center rotate-12 shadow-lg'>
                <Text className='text-4xl'>💊</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Form */}
        <View className='px-6 pt-6 gap-5'>
          {/* Pill Name */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>Pill name</Text>
            <Input
              value={pillName}
              onChangeText={setPillName}
              placeholder='Enter the pill name'
              className='bg-white'
            />
          </View>

          {/* Dose and Shape Row */}
          <View className='flex-row gap-3'>
            {/* Dose */}
            <View className='flex-1'>
              <Text className='text-sm font-medium text-text-primary mb-2'>dose</Text>
              <TouchableOpacity className='bg-white rounded-xl px-4 py-4 flex-row items-center justify-between border border-gray-200'>
                <Text className='text-text-primary font-medium'>{dose}</Text>
                <MaterialIcons name='expand-more' size={24} color='#6B7280' />
              </TouchableOpacity>
            </View>

            {/* Shape */}
            <View className='flex-1'>
              <Text className='text-sm font-medium text-text-primary mb-2'>shape</Text>
              <TouchableOpacity className='bg-white rounded-xl px-4 py-4 flex-row items-center justify-between border border-gray-200'>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='medication' size={20} color='#7B5FFF' />
                  <Text className='text-text-primary font-medium capitalize'>{shape}</Text>
                </View>
                <MaterialIcons name='expand-more' size={24} color='#6B7280' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Time */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>Time</Text>
            <View className='bg-white rounded-xl p-4 flex-row items-center justify-between border border-gray-200'>
              {/* Hour */}
              <TouchableOpacity className='flex-1 items-center'>
                <Text className='text-3xl font-bold text-text-primary'>{time.hour}</Text>
              </TouchableOpacity>

              <Text className='text-3xl font-bold text-text-primary'>:</Text>

              {/* Minute */}
              <TouchableOpacity className='flex-1 items-center'>
                <Text className='text-3xl font-bold text-text-primary'>{time.minute}</Text>
              </TouchableOpacity>

              {/* AM/PM */}
              <TouchableOpacity className='ml-4 bg-gray-100 rounded-lg px-4 py-2'>
                <Text className='text-lg font-semibold text-text-primary'>{time.period}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* How to use */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>How to use</Text>
            <View className='flex-row gap-3'>
              {/* Days */}
              <View className='flex-1'>
                <Text className='text-xs text-text-secondary mb-2'>days</Text>
                <TouchableOpacity className='bg-white rounded-xl px-4 py-4 flex-row items-center justify-between border border-gray-200'>
                  <Text className='text-text-primary font-medium'>{howToUse.days}</Text>
                  <MaterialIcons name='expand-more' size={24} color='#6B7280' />
                </TouchableOpacity>
              </View>

              {/* Before/After eat */}
              <View className='flex-1'>
                <Text className='text-xs text-text-secondary mb-2'>timing</Text>
                <TouchableOpacity className='bg-white rounded-xl px-4 py-4 flex-row items-center justify-between border border-gray-200'>
                  <Text className='text-text-primary font-medium'>{howToUse.timing}</Text>
                  <MaterialIcons name='expand-more' size={24} color='#6B7280' />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Add Medicine Button */}
          <View className='mt-6 mb-8'>
            <Button
              title='Add Medicine'
              variant='primary'
              onPress={handleAddMedicine}
              className='bg-primary py-5 rounded-full'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
