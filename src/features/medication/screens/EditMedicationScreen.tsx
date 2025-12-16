import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useMedications } from '../hooks/useMedications';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'EditMedication'>;
type EditMedicationRouteProp = RouteProp<MedicationStackParamList, 'EditMedication'>;

console.log('[EDIT_MEDICATION_MODULE] Module loaded');

export function EditMedicationScreen() {
    console.log('[EDIT_MEDICATION] Component rendering - START');
    const navigation = useNavigation<NavigationProp>();
    console.log('[EDIT_MEDICATION] useNavigation OK');
    const route = useRoute<EditMedicationRouteProp>();
    console.log('[EDIT_MEDICATION] useRoute OK');

    const { medicationId } = route.params || {};
    console.log('[EDIT_MEDICATION] medicationId:', medicationId);
    const { medications, updateMedication, loading: medicationsLoading } = useMedications();
    console.log('[EDIT_MEDICATION] useMedications OK, loading:', medicationsLoading, 'count:', medications.length);

    // Busca diretamente sem useMemo para evitar re-renders
    const medication = medicationId ? medications.find((med) => med.id === medicationId) : undefined;
    console.log('[EDIT_MEDICATION] medication found:', !!medication);

    // Form state
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    // Validation
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        console.log('[EDIT_MEDICATION] useEffect triggered, medication:', !!medication, 'initialized:', initialized);
        if (medication && !initialized) {
            console.log('[EDIT_MEDICATION] Setting form values (first time only)');
            setName(medication.name);
            setDosage(medication.dosage);
            setFrequency(medication.frequency);
            setNotes(medication.notes || '');
            setInitialized(true);
            console.log('[EDIT_MEDICATION] Form values set and initialized');
        }
    }, [medication, initialized]);

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

    const handleUpdateMedicine = async () => {
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
            await updateMedication(medicationId, {
                name: name.trim(),
                dosage: dosage.trim(),
                frequency: frequency.trim(),
                ...(notes.trim() && { notes: notes.trim() }),
            });

            Alert.alert('Sucesso', 'Medicamento atualizado com sucesso!', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            console.error('[EDIT_MEDICATION] Update error:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o medicamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Mostra loading enquanto medications não carregaram
    if (medicationsLoading) {
        console.log('[EDIT_MEDICATION] Returning loading screen');
        return (
            <View className='flex-1 bg-gray-50 items-center justify-center'>
                <ActivityIndicator size='large' color='#7B5FFF' />
                <Text className='mt-4 text-gray-600'>Carregando medicamento...</Text>
            </View>
        );
    }

    // Só mostra erro se medications já carregaram e não encontrou
    if (!medicationsLoading && !medication) {
        console.log('[EDIT_MEDICATION] Returning error screen');
        return (
            <View className='flex-1 bg-gray-50 items-center justify-center px-6'>
                <MaterialIcons name='error-outline' size={64} color='#EF4444' />
                <Text className='mt-4 text-lg font-bold text-gray-900'>Medicamento não encontrado</Text>
                <Text className='mt-2 text-gray-600 text-center'>
                    O medicamento que você está tentando editar não foi encontrado.
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className='mt-6 bg-primary rounded-lg px-6 py-3'
                >
                    <Text className='text-white font-semibold'>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    console.log('[EDIT_MEDICATION] Returning main form');
    return (
        <View className='flex-1 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200'>
            <ScrollView className='flex-1'>
                {/* Header */}
                <View className='bg-white rounded-b-[40px] px-6 pt-14 pb-6'>
                    <View className='flex-row justify-between items-center mb-6'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name='arrow-back' size={24} color='#1A1A1A' />
                        </TouchableOpacity>
                        <Text className='text-2xl font-bold text-primary'>Editar Medicamento</Text>
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
                                <Text className='text-4xl'>✏️</Text>
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

                    {/* Dosage and Frequency Row */}
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
                                placeholder='Ex: 500mg'
                                className='bg-white'
                            />
                            {errors.dosage && <Text className='text-red-500 text-xs mt-1'>{errors.dosage}</Text>}
                        </View>

                        {/* Frequency */}
                        <View className='flex-1'>
                            <Text className='text-sm font-medium text-text-primary mb-2'>
                                Frequência <Text className='text-red-500'>*</Text>
                            </Text>
                            <Input
                                value={frequency}
                                onChangeText={(text) => {
                                    setFrequency(text);
                                    if (errors.frequency) setErrors({ ...errors, frequency: '' });
                                }}
                                placeholder='Ex: 8/8h'
                                className='bg-white'
                            />
                            {errors.frequency && (
                                <Text className='text-red-500 text-xs mt-1'>{errors.frequency}</Text>
                            )}
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

                    {/* Start Date Info */}
                    <View className='bg-blue-50 rounded-xl p-4 border border-blue-200'>
                        <View className='flex-row items-center gap-2'>
                            <MaterialIcons name='calendar-today' size={20} color='#3B82F6' />
                            <View className='flex-1'>
                                <Text className='text-sm font-medium text-text-primary'>Data de início</Text>
                                <Text className='text-xs text-text-secondary mt-1'>
                                    {medication && new Date(medication.startDate).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Update Medicine Button */}
                    <View className='mt-6 mb-8'>
                        <Button
                            title={loading ? 'Salvando...' : 'Salvar Alterações'}
                            variant='primary'
                            onPress={handleUpdateMedicine}
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

