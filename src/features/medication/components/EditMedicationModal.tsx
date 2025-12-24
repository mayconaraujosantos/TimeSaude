import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Input } from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import { Dropdown } from '@/shared/components/molecules/Dropdown';
import { ColorPicker } from '@/shared/components/molecules/ColorPicker';
import { IconPicker } from '@/shared/components/molecules/IconPicker';
import { DatePicker } from '@/shared/components/molecules/DatePicker';
import { useMedications } from '../hooks/useMedications';
import type { DosageUnit, MedicationForm } from '../model';

interface EditMedicationModalProps {
  visible: boolean;
  medicationId: string | null;
  onClose: () => void;
}

export function EditMedicationModal({ visible, medicationId, onClose }: EditMedicationModalProps) {
  const { medications, updateMedication } = useMedications();

  // Busca o medication apenas quando necessário
  const medication = medicationId ? medications.find(med => med.id === medicationId) : null; // Form state
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [dosageUnit, setDosageUnit] = useState<DosageUnit>('mg');
  const [form, setForm] = useState<MedicationForm>('tablet');
  const [purpose, setPurpose] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [colorCode, setColorCode] = useState('#3B82F6');
  const [icon, setIcon] = useState('pill');
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preenche o formulário quando o modal abre com um novo medication
  useEffect(() => {
    if (medication && visible) {
      setName(medication.name);
      setDosage(medication.dosage);
      setDosageUnit(medication.dosageUnit);
      setForm(medication.form);
      setPurpose(medication.purpose || '');
      setFrequency(medication.frequency);
      setNotes(medication.notes || '');
      setColorCode(medication.colorCode);
      setIcon(medication.icon);
      setEndDate(medication.endDate);
      setErrors({});
    }
  }, [medicationId, visible]); // Só atualiza quando o ID muda ou modal abre

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

  const handleUpdate = async () => {
    if (!validateForm()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!medicationId) {
      Alert.alert('Erro', 'Medicamento não encontrado');
      return;
    }

    setLoading(true);

    try {
      console.log('[EDIT_MODAL] Atualizando medication:', medicationId, {
        name: name.trim(),
        dosage: dosage.trim(),
        frequency: frequency.trim(),
      });

      const updateData: any = {
        name: name.trim(),
        dosage: dosage.trim(),
        dosageUnit,
        form,
        frequency: frequency.trim(),
        colorCode,
        icon,
        endDate,
      };

      if (purpose.trim()) {
        updateData.purpose = purpose.trim();
      }

      if (notes.trim()) {
        updateData.notes = notes.trim();
      }

      await updateMedication(medicationId, updateData);

      console.log('[EDIT_MODAL] Medication atualizado com sucesso');
      Alert.alert('Sucesso', 'Medicamento atualizado com sucesso!');
      onClose();
    } catch (error) {
      console.error('[EDIT_MODAL] Error updating medication:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o medicamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType='slide' transparent={false} onRequestClose={onClose}>
      <View className='flex-1 bg-white'>
        {/* Header */}
        <View className='flex-row justify-between items-center px-6 pt-12 pb-4 border-b border-gray-200 bg-white'>
          <Text className='text-xl font-bold text-gray-900'>Editar Medicamento</Text>
          <TouchableOpacity onPress={onClose} className='p-2'>
            <MaterialIcons name='close' size={24} color='#6B7280' />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className='flex-1'
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            className='flex-1 px-6 py-4'
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Medication Name */}
            <View className='mb-4'>
              <Text className='text-sm font-medium text-gray-700 mb-2'>
                Nome do Medicamento <Text className='text-red-500'>*</Text>
              </Text>
              <Input
                value={name}
                onChangeText={text => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder='Ex: Paracetamol'
              />
              {errors.name && <Text className='text-red-500 text-xs mt-1'>{errors.name}</Text>}
            </View>

            {/* Dosage and Frequency */}
            <View className='flex-row gap-3 mb-4'>
              <View className='flex-1'>
                <Text className='text-sm font-medium text-gray-700 mb-2'>
                  Dosagem <Text className='text-red-500'>*</Text>
                </Text>
                <Input
                  value={dosage}
                  onChangeText={text => {
                    setDosage(text);
                    if (errors.dosage) setErrors({ ...errors, dosage: '' });
                  }}
                  placeholder='Ex: 500'
                  keyboardType='numeric'
                />
                {errors.dosage && (
                  <Text className='text-red-500 text-xs mt-1'>{errors.dosage}</Text>
                )}
              </View>

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
            <View className='mb-4'>
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
            </View>

            {/* Purpose */}
            <View className='mb-4'>
              <Text className='text-sm font-medium text-gray-700 mb-2'>Para que serve?</Text>
              <Input
                value={purpose}
                onChangeText={setPurpose}
                placeholder='Ex: Controle de pressão arterial'
              />
            </View>

            {/* Frequency */}
            <View className='mb-4'>
              <Text className='text-sm font-medium text-gray-700 mb-2'>
                Frequência <Text className='text-red-500'>*</Text>
              </Text>
              <Input
                value={frequency}
                onChangeText={text => {
                  setFrequency(text);
                  if (errors.frequency) setErrors({ ...errors, frequency: '' });
                }}
                placeholder='Ex: 8/8h ou 2x ao dia'
              />
              {errors.frequency && (
                <Text className='text-red-500 text-xs mt-1'>{errors.frequency}</Text>
              )}
            </View>

            {/* Color and Icon */}
            <View className='flex-row gap-3 mb-4'>
              <View className='flex-1'>
                <ColorPicker label='Cor' value={colorCode} onSelect={setColorCode} />
              </View>

              <View className='flex-1'>
                <IconPicker label='Ícone' value={icon} onSelect={setIcon} />
              </View>
            </View>

            {/* End Date */}
            <View className='mb-4'>
              <DatePicker
                label='Data Final do Tratamento'
                value={endDate}
                onSelect={setEndDate}
                placeholder='Contínuo'
              />
            </View>

            {/* Notes */}
            <View className='mb-4'>
              <Text className='text-sm font-medium text-gray-700 mb-2'>Observações</Text>
              <Input
                value={notes}
                onChangeText={setNotes}
                placeholder='Ex: Tomar após as refeições'
                multiline={true}
                numberOfLines={3}
              />
            </View>

            {/* Start Date Info */}
            {medication && (
              <View className='bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6'>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='calendar-today' size={20} color='#3B82F6' />
                  <View className='flex-1'>
                    <Text className='text-sm font-medium text-gray-700'>Data de início</Text>
                    <Text className='text-xs text-gray-500 mt-1'>
                      {new Date(medication.startDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Buttons */}
            <View className='flex-row gap-3 pb-6'>
              <View className='flex-1'>
                <Button title='Cancelar' variant='secondary' onPress={onClose} disabled={loading} />
              </View>
              <View className='flex-1'>
                <Button
                  title={loading ? 'Salvando...' : 'Salvar'}
                  variant='primary'
                  onPress={handleUpdate}
                  disabled={loading}
                />
              </View>
            </View>

            {loading && (
              <View className='items-center pb-4'>
                <ActivityIndicator size='small' color='#7B5FFF' />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
