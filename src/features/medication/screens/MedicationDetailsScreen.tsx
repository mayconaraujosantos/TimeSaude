import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useTheme } from '@/shared/hooks/useTheme';
import { useMedications } from '../hooks/useMedications';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'MedicationDetails'>;
type RouteParams = RouteProp<MedicationStackParamList, 'MedicationDetails'>;

export function MedicationDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const { colors } = useTheme();
  const { medications, updateMedication } = useMedications();

  const medication = medications.find(m => m.id === route.params.medicationId);
  const [isActive, setIsActive] = useState(medication?.isActive ?? true);

  if (!medication) {
    return (
      <View
        className='flex-1 items-center justify-center'
        style={{ backgroundColor: colors.background }}
      >
        <Text style={{ color: colors.textPrimary }}>Medicamento não encontrado</Text>
      </View>
    );
  }

  const handleToggleActive = async (value: boolean) => {
    setIsActive(value);
    await updateMedication(medication.id, { isActive: value });
  };

  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(medication.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className='px-6 pt-14 pb-6' style={{ backgroundColor: colors.surface }}>
        <View className='flex-row justify-between items-center'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text className='text-xl font-semibold' style={{ color: colors.textPrimary }}>
            Medication details
          </Text>
          <TouchableOpacity
            onPress={() => {
              /* TODO: Menu */
            }}
          >
            <MaterialIcons name='more-vert' size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className='flex-1'>
        <View className='px-6 pt-6'>
          {/* Medication Card */}
          <View
            className='rounded-3xl p-6 flex-row items-center justify-between mb-6'
            style={{ backgroundColor: colors.surface }}
          >
            <View className='flex-row items-center gap-4'>
              {/* Medication Image */}
              {medication.imageUri ? (
                <Image
                  source={{ uri: medication.imageUri }}
                  style={{ width: 60, height: 60, borderRadius: 16 }}
                  resizeMode='cover'
                />
              ) : (
                <View
                  className='w-16 h-16 rounded-2xl items-center justify-center'
                  style={{ backgroundColor: medication.colorCode }}
                >
                  <Text className='text-2xl'>💊</Text>
                </View>
              )}

              {/* Name */}
              <View>
                <Text className='text-lg font-semibold' style={{ color: colors.textPrimary }}>
                  {medication.name}
                </Text>
                <Text className='text-sm mt-1' style={{ color: colors.textSecondary }}>
                  {medication.dosage} {medication.dosageUnit}
                </Text>
              </View>
            </View>

            {/* Active Toggle */}
            <Switch
              value={isActive}
              onValueChange={handleToggleActive}
              trackColor={{ false: colors.border, true: `${colors.primary}80` }}
              thumbColor={isActive ? colors.primary : colors.textLight}
            />
          </View>

          {/* Schedule Section */}
          <View className='mb-6'>
            <Text className='text-base font-semibold mb-4' style={{ color: colors.textPrimary }}>
              Schedule
            </Text>

            <View className='flex-row gap-3 mb-3'>
              {/* Start Date */}
              <TouchableOpacity
                className='flex-1 rounded-2xl p-4 flex-row items-center justify-between'
                style={{ backgroundColor: colors.surface }}
              >
                <View>
                  <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                    Start date
                  </Text>
                  <View className='flex-row items-center gap-2'>
                    <MaterialIcons name='calendar-today' size={18} color={colors.textPrimary} />
                    <Text className='text-sm font-medium' style={{ color: colors.textPrimary }}>
                      {new Date(medication.startDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </Text>
                  </View>
                </View>
                <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              {/* Time */}
              <TouchableOpacity
                className='flex-1 rounded-2xl p-4 flex-row items-center justify-between'
                style={{ backgroundColor: colors.surface }}
              >
                <View>
                  <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                    Time
                  </Text>
                  <View className='flex-row items-center gap-2'>
                    <MaterialIcons name='access-time' size={18} color={colors.textPrimary} />
                    <Text className='text-sm font-medium' style={{ color: colors.textPrimary }}>
                      09:45 Am
                    </Text>
                  </View>
                </View>
                <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Frequency */}
            <TouchableOpacity
              className='rounded-2xl p-4 flex-row items-center justify-between'
              style={{ backgroundColor: colors.surface }}
            >
              <View>
                <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                  Frequency
                </Text>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='schedule' size={18} color={colors.textPrimary} />
                  <Text className='text-sm font-medium' style={{ color: colors.textPrimary }}>
                    {medication.frequency}
                  </Text>
                </View>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Dose Section */}
          <View className='mb-6'>
            <Text className='text-base font-semibold mb-4' style={{ color: colors.textPrimary }}>
              Dose
            </Text>

            <View className='flex-row gap-3'>
              {/* Dose Amount */}
              <TouchableOpacity
                className='flex-1 rounded-2xl p-4 flex-row items-center justify-between'
                style={{ backgroundColor: colors.surface }}
              >
                <View>
                  <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                    Dose amount
                  </Text>
                  <View className='flex-row items-center gap-2'>
                    <MaterialIcons name='medication' size={18} color={colors.textPrimary} />
                    <Text className='text-sm font-medium' style={{ color: colors.textPrimary }}>
                      {medication.dosage} {medication.form}
                    </Text>
                  </View>
                </View>
                <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              {/* Initial Stock */}
              <TouchableOpacity
                className='flex-1 rounded-2xl p-4 flex-row items-center justify-between'
                style={{ backgroundColor: colors.surface }}
              >
                <View>
                  <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                    Initial stock
                  </Text>
                  <View className='flex-row items-center gap-2'>
                    <MaterialIcons name='inventory' size={18} color={colors.textPrimary} />
                    <Text className='text-sm font-medium' style={{ color: colors.textPrimary }}>
                      30 Pills
                    </Text>
                  </View>
                </View>
                <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Note Section */}
          <View className='mb-8'>
            <TouchableOpacity
              className='rounded-2xl p-4 flex-row items-center justify-between mb-4'
              style={{ backgroundColor: colors.surface }}
            >
              <View className='flex-1'>
                <Text className='text-xs mb-1' style={{ color: colors.textSecondary }}>
                  Note
                </Text>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='note' size={18} color={colors.textPrimary} />
                  <Text className='text-sm flex-1' style={{ color: colors.textSecondary }}>
                    {medication.notes || 'Optional note about the medication'}
                  </Text>
                </View>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {/* Usage Stats */}
            <View
              className='rounded-2xl p-4 flex-row items-center gap-3'
              style={{ backgroundColor: `${colors.info}15` }}
            >
              <View
                className='w-10 h-10 rounded-full items-center justify-center'
                style={{ backgroundColor: colors.info }}
              >
                <MaterialIcons name='check' size={20} color='#FFFFFF' />
              </View>
              <Text className='text-sm flex-1' style={{ color: colors.textPrimary }}>
                <Text className='font-semibold'>20 pills taken</Text>
                {' • '}
                Started {daysSinceStart} days ago
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
