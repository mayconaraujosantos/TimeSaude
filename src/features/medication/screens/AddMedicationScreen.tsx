import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import { Dropdown } from '@/shared/components/molecules/Dropdown';
import { ColorPicker } from '@/shared/components/molecules/ColorPicker';
import { IconPicker } from '@/shared/components/molecules/IconPicker';
import { DatePicker } from '@/shared/components/molecules/DatePicker';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useMedications } from '../hooks/useMedications';
import { useAuth } from '@/shared/contexts/AuthContext';
import { generateId } from '@/shared/utils';
import type { Medication, DosageUnit, MedicationForm } from '../model';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'AddMedication'>;

export function AddMedicationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addMedication } = useMedications();
  const { user } = useAuth();

  // Form state
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageUnit, setDosageUnit] = useState<DosageUnit>('mg');
  const [form, setForm] = useState<MedicationForm>('tablet');
  const [purpose, setPurpose] = useState('');
  const [frequency, setFrequency] = useState('8/8h');
  const [notes, setNotes] = useState('');
  const [colorCode, setColorCode] = useState('#3B82F6');
  const [icon, setIcon] = useState('pill');
  const [startDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nome do medicamento é obrigatório';
    }

    if (!dosage.trim()) {
      newErrors.dosage = 'Dosagem é obrigatória';
    }

    if (!frequency.trim()) {
      newErrors.frequency = 'Frequência é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMedicine = async () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado');
        return;
      }

      const medication: Medication = {
        id: generateId(),
        userId: user.id,
        name: name.trim(),
        dosage: dosage.trim(),
        dosageUnit,
        form,
        purpose: purpose.trim() || undefined,
        frequency: frequency.trim(),
        startDate,
        endDate,
        notes: notes.trim() || undefined,
        colorCode,
        icon,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addMedication(medication);

      Alert.alert('Sucesso', 'Medicamento adicionado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o medicamento. Tente novamente.');
      console.error('Error adding medication:', error);
    } finally {
      setLoading(false);
    }
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
          {/* Medication Name */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>
              Nome do Medicamento <Text className='text-red-500'>*</Text>
            </Text>
            <Input
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder='Ex: Paracetamol'
              className='bg-white'
            />
            {errors.name && <Text className='text-red-500 text-xs mt-1'>{errors.name}</Text>}
          </View>

          {/* Dosage, Unit and Form Row */}
          <View className='flex-row gap-3'>
            {/* Dosage */}
            <View className='flex-1'>
              <Text className='text-sm font-medium text-text-primary mb-2'>
                Dosagem <Text className='text-red-500'>*</Text>
              </Text>
              <Input
                value={dosage}
                onChangeText={(text) => {
                  setDosage(text);
                  if (errors.dosage) setErrors({ ...errors, dosage: '' });
                }}
                placeholder='Ex: 500'
                keyboardType='numeric'
                className='bg-white'
              />
              {errors.dosage && <Text className='text-red-500 text-xs mt-1'>{errors.dosage}</Text>}
            </View>

            {/* Dosage Unit */}
            <View className='flex-1'>
              <Dropdown
                label='Unidade'
                value={dosageUnit}
                onSelect={setDosageUnit}
                required
                options={[
                  { label: 'mg', value: 'mg' },
                  { label: 'ml', value: 'ml' },
                  { label: 'g', value: 'g' },
                  { label: 'mcg', value: 'mcg' },
                  { label: 'UI', value: 'unit' },
                  { label: 'Gotas', value: 'drop' },
                  { label: 'Puff', value: 'puff' },
                  { label: 'Comprimido', value: 'tablet' },
                  { label: 'Cápsula', value: 'capsule' },
                ]}
              />
            </View>
          </View>

          {/* Form */}
          <Dropdown
            label='Forma Farmacêutica'
            value={form}
            onSelect={setForm}
            required
            options={[
              { label: 'Comprimido', value: 'tablet', icon: '💊' },
              { label: 'Cápsula', value: 'capsule', icon: '⚪' },
              { label: 'Xarope', value: 'syrup', icon: '🧪' },
              { label: 'Injeção', value: 'injection', icon: '💉' },
              { label: 'Gotas', value: 'drops', icon: '💧' },
              { label: 'Creme/Pomada', value: 'cream', icon: '🧴' },
              { label: 'Spray', value: 'spray', icon: '💨' },
              { label: 'Adesivo', value: 'patch', icon: '🩹' },
              { label: 'Outro', value: 'other', icon: '📦' },
            ]}
          />

          {/* Purpose */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>
              Para que serve?
            </Text>
            <Input
              value={purpose}
              onChangeText={setPurpose}
              placeholder='Ex: Controle de pressão arterial'
              className='bg-white'
            />
          </View>

          {/* Frequency */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>
              Frequência <Text className='text-red-500'>*</Text>
            </Text>
            <Input
              value={frequency}
              onChangeText={(text) => {
                setFrequency(text);
                if (errors.frequency) setErrors({ ...errors, frequency: '' });
              }}
              placeholder='Ex: 8/8h ou 2x ao dia'
              className='bg-white'
            />
            {errors.frequency && (
              <Text className='text-red-500 text-xs mt-1'>{errors.frequency}</Text>
            )}
          </View>

          {/* Color and Icon Row */}
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              <ColorPicker
                label='Cor do Medicamento'
                value={colorCode}
                onSelect={setColorCode}
              />
            </View>

            <View className='flex-1'>
              <IconPicker
                label='Ícone'
                value={icon}
                onSelect={setIcon}
              />
            </View>
          </View>

          {/* Start and End Date */}
          <View className='flex-row gap-3'>
            {/* Start Date Info */}
            <View className='flex-1'>
              <Text className='text-sm font-medium text-text-primary mb-2'>
                Data de Início
              </Text>
              <View className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='calendar-today' size={20} color='#3B82F6' />
                  <Text className='text-sm text-text-primary'>
                    {startDate.toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </Text>
                </View>
              </View>
            </View>

            {/* End Date */}
            <View className='flex-1'>
              <DatePicker
                label='Data Final'
                value={endDate}
                onSelect={setEndDate}
                placeholder='Contínuo'
                minimumDate={startDate}
              />
            </View>
          </View>

          {/* Notes */}
          <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>Observações</Text>
            <Input
              value={notes}
              onChangeText={setNotes}
              placeholder='Ex: Tomar após as refeições'
              className='bg-white'
              multiline={true}
              numberOfLines={3}
            />
            <Text className='text-xs text-text-secondary mt-1'>
              Adicione instruções especiais ou lembretes
            </Text>
          </View>

          {/* Add Medicine Button */}
          <View className='mt-6 mb-8'>
            <Button
              title={loading ? 'Salvando...' : 'Adicionar Medicamento'}
              variant='primary'
              onPress={handleAddMedicine}
              disabled={loading}
            />
            {loading && (
              <View className='mt-4 items-center'>
                <ActivityIndicator size='small' color='#7B5FFF' />
              </View>
            )}
          </View>

          {/* Required Fields Info */}
          <View className='mb-8 px-4'>
            <Text className='text-xs text-text-secondary text-center'>
              <Text className='text-red-500'>*</Text> Campos obrigatórios
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
