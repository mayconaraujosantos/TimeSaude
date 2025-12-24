import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
import { useTheme } from '@/shared/hooks/useTheme';
import { generateId } from '@/shared/utils';
import type { Medication, DosageUnit, MedicationForm } from '../model';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'AddMedication'>;

export function AddMedicationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addMedication } = useMedications();
  const { user } = useAuth();
  const { colors } = useTheme();

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
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [startDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para selecionar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

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
        ...(purpose.trim() && { purpose: purpose.trim() }),
        frequency: frequency.trim(),
        startDate,
        ...(endDate && { endDate }),
        ...(notes.trim() && { notes: notes.trim() }),
        ...(imageUri && { imageUri }),
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
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header Fixo */}
      <View
        className='rounded-b-[40px] px-6 pt-14 pb-6'
        style={{ backgroundColor: colors.surface }}
      >
        <View className='flex-row justify-between items-center mb-6'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='arrow-back' size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text className='text-2xl font-bold' style={{ color: colors.primary }}>
            Add Medicine
          </Text>
          <TouchableOpacity className='p-2'>
            <MaterialIcons name='menu' size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Pill Icon */}
        <View className='items-center mt-4 mb-6'>
          <View className='relative'>
            {/* Decorative circles */}
            <View
              className='absolute -top-2 -right-2 w-12 h-12 rounded-full opacity-30'
              style={{ backgroundColor: colors.accent }}
            />
            <View
              className='absolute -bottom-2 -left-3 w-16 h-16 rounded-full opacity-30'
              style={{ backgroundColor: colors.secondary }}
            />

            {/* Main pill icon */}
            <View
              className='w-24 h-24 rounded-3xl items-center justify-center rotate-12'
              style={{
                backgroundColor: colors.primary,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className='text-4xl'>💊</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Form Scrollable */}
      <ScrollView className='flex-1'>
        <View className='px-6 pt-6 gap-5'>
          {/* Medication Name */}
          <View>
            <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
              Nome do Medicamento <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <Input
              value={name}
              onChangeText={text => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder='Ex: Paracetamol'
              borderRadius={20}
              className='bg-white'
            />
            {errors.name && (
              <Text className='text-xs mt-1' style={{ color: colors.error }}>
                {errors.name}
              </Text>
            )}
          </View>

          {/* Dosage, Unit and Form Row */}
          <View className='flex-row gap-3'>
            {/* Dosage */}
            <View className='flex-1'>
              <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
                Dosagem <Text style={{ color: colors.error }}>*</Text>
              </Text>
              <Input
                value={dosage}
                onChangeText={text => {
                  setDosage(text);
                  if (errors.dosage) setErrors({ ...errors, dosage: '' });
                }}
                placeholder='Ex: 500'
                keyboardType='numeric'
                borderRadius={20}
                className='bg-white'
              />
              {errors.dosage && (
                <Text className='text-xs mt-1' style={{ color: colors.error }}>
                  {errors.dosage}
                </Text>
              )}
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
            <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
              Para que serve?
            </Text>
            <Input
              value={purpose}
              onChangeText={setPurpose}
              placeholder='Ex: Controle de pressão arterial'
              borderRadius={20}
              className='bg-white'
            />
          </View>

          {/* Frequency */}
          <View>
            <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
              Frequência <Text style={{ color: colors.error }}>*</Text>
            </Text>
            <Input
              value={frequency}
              onChangeText={text => {
                setFrequency(text);
                if (errors.frequency) setErrors({ ...errors, frequency: '' });
              }}
              placeholder='Ex: 8/8h ou 2x ao dia'
              borderRadius={20}
              className='bg-white'
            />
            {errors.frequency && (
              <Text className='text-xs mt-1' style={{ color: colors.error }}>
                {errors.frequency}
              </Text>
            )}
          </View>

          {/* Color and Icon Row */}
          <View className='flex-row gap-3'>
            <View className='flex-1'>
              <ColorPicker label='Cor do Medicamento' value={colorCode} onSelect={setColorCode} />
            </View>

            <View className='flex-1'>
              <IconPicker label='Ícone' value={icon} onSelect={setIcon} />
            </View>
          </View>

          {/* Medication Image */}
          <View>
            <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
              Imagem do Medicamento
            </Text>
            <TouchableOpacity
              onPress={pickImage}
              className='rounded-2xl border-2 border-dashed p-6 items-center justify-center'
              style={{
                borderColor: colors.border,
                backgroundColor: `${colors.primary}05`,
              }}
            >
              {imageUri ? (
                <View className='items-center'>
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: 120, height: 120, borderRadius: 12 }}
                    resizeMode='cover'
                  />
                  <Text className='text-xs mt-2' style={{ color: colors.textSecondary }}>
                    Toque para alterar
                  </Text>
                </View>
              ) : (
                <View className='items-center'>
                  <MaterialIcons name='add-photo-alternate' size={48} color={colors.primary} />
                  <Text className='text-sm mt-2' style={{ color: colors.textPrimary }}>
                    Adicionar Foto
                  </Text>
                  <Text className='text-xs mt-1' style={{ color: colors.textSecondary }}>
                    Opcional
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Start and End Date */}
          <View className='flex-row gap-3'>
            {/* Start Date Info */}
            <View className='flex-1'>
              <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
                Data de Início
              </Text>
              <View
                className='rounded-xl p-4 border'
                style={{ backgroundColor: `${colors.info}15`, borderColor: `${colors.info}40` }}
              >
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='calendar-today' size={20} color={colors.info} />
                  <Text className='text-sm' style={{ color: colors.textPrimary }}>
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
            <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
              Observações
            </Text>
            <Input
              value={notes}
              onChangeText={setNotes}
              placeholder='Ex: Tomar após as refeições'
              borderRadius={20}
              className='bg-white'
              multiline={true}
              numberOfLines={3}
            />
            <Text className='text-xs mt-1' style={{ color: colors.textSecondary }}>
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
                <ActivityIndicator size='small' color={colors.primary} />
              </View>
            )}
          </View>

          {/* Required Fields Info */}
          <View className='mb-8 px-4'>
            <Text className='text-xs text-center' style={{ color: colors.textSecondary }}>
              <Text style={{ color: colors.error }}>*</Text> Campos obrigatórios
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
