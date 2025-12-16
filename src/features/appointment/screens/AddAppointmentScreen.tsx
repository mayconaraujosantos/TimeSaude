import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import type { CreateAppointmentInput } from '../model';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList>;

const appointmentTypes: Array<{ value: CreateAppointmentInput['type']; label: string; icon: string; color: string }> = [
    { value: 'consultation', label: 'Consulta', icon: 'medical-services', color: '#7B5FFF' },
    { value: 'exam', label: 'Exame', icon: 'science', color: '#3B82F6' },
    { value: 'procedure', label: 'Procedimento', icon: 'healing', color: '#EF4444' },
    { value: 'followup', label: 'Retorno', icon: 'event-repeat', color: '#10B981' },
    { value: 'other', label: 'Outro', icon: 'event-note', color: '#6B7280' },
];

export function AddAppointmentScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { addAppointment } = useAppointments();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [selectedType, setSelectedType] = useState<CreateAppointmentInput['type']>('consultation');
    const [notes, setNotes] = useState('');

    // DateTimePicker states
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (_event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setSelectedDate(selectedDate);
            const dateStr = selectedDate.toISOString().split('T')[0];
            setDate(dateStr || '');
        }
    };

    const handleTimeChange = (_event: any, selectedTime?: Date) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setSelectedTime(selectedTime);
            const hours = selectedTime.getHours().toString().padStart(2, '0');
            const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}`);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o título da consulta');
            return;
        }
        if (!date.trim()) {
            Alert.alert('Erro', 'Por favor, preencha a data');
            return;
        }
        if (!time.trim()) {
            Alert.alert('Erro', 'Por favor, preencha o horário');
            return;
        }

        try {
            const appointmentData: CreateAppointmentInput = {
                title: title.trim(),
                date: date.trim(),
                time: time.trim(),
                type: selectedType,
                status: 'scheduled',
                ...(description.trim() && { description: description.trim() }),
                ...(location.trim() && { location: location.trim() }),
                ...(notes.trim() && { notes: notes.trim() }),
            };

            await addAppointment(appointmentData);
            Alert.alert('Sucesso', 'Consulta agendada com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível agendar a consulta');
        }
    };

    return (
        <View className='flex-1' style={{ backgroundColor: '#F8F9FA' }}>
            {/* Header */}
            <View
                className='px-6 pt-16 pb-6'
                style={{
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 4,
                }}
            >
                <View className='flex-row items-center justify-between'>
                    <TouchableOpacity
                        className='w-10 h-10 items-center justify-center rounded-full'
                        style={{ backgroundColor: '#F3F4F6' }}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name='arrow-back' size={24} color='#1A1A1A' />
                    </TouchableOpacity>
                    <Text className='text-2xl font-bold' style={{ color: '#1A1A1A' }}>
                        Agendar Consulta
                    </Text>
                    <View className='w-10' />
                </View>
            </View>

            <ScrollView className='flex-1 px-6 pt-6'>
                {/* Title */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                        Título *
                    </Text>
                    <TextInput
                        className='rounded-2xl px-4 py-3'
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            color: '#1A1A1A',
                        }}
                        placeholder='Ex: Consulta com Cardiologista'
                        placeholderTextColor='#9CA3AF'
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                {/* Type Selection */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium mb-3' style={{ color: '#1A1A1A' }}>
                        Tipo de Consulta *
                    </Text>
                    <View className='flex-row flex-wrap gap-2'>
                        {appointmentTypes.map((type) => (
                            <TouchableOpacity
                                key={type.value}
                                className='flex-row items-center gap-2 px-4 py-3 rounded-2xl'
                                style={{
                                    backgroundColor: selectedType === type.value ? `${type.color}15` : '#FFFFFF',
                                    borderWidth: 2,
                                    borderColor: selectedType === type.value ? type.color : '#E5E7EB',
                                }}
                                onPress={() => setSelectedType(type.value)}
                            >
                                <MaterialIcons
                                    name={type.icon as any}
                                    size={20}
                                    color={selectedType === type.value ? type.color : '#6B7280'}
                                />
                                <Text
                                    className='text-sm font-medium'
                                    style={{ color: selectedType === type.value ? type.color : '#6B7280' }}
                                >
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Description */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                        Descrição
                    </Text>
                    <TextInput
                        className='rounded-2xl px-4 py-3'
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            color: '#1A1A1A',
                            minHeight: 80,
                            textAlignVertical: 'top',
                        }}
                        placeholder='Descreva o motivo da consulta'
                        placeholderTextColor='#9CA3AF'
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {/* Date and Time */}
                <View className='flex-row gap-4 mb-6'>
                    <View className='flex-1'>
                        <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                            Data *
                        </Text>
                        <TouchableOpacity
                            className='rounded-2xl px-4 py-3 flex-row items-center justify-between'
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 1,
                                borderColor: '#E5E7EB',
                            }}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: date ? '#1A1A1A' : '#9CA3AF' }}>
                                {date || 'YYYY-MM-DD'}
                            </Text>
                            <MaterialIcons name='calendar-today' size={20} color='#7B5FFF' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-1'>
                        <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                            Horário *
                        </Text>
                        <TouchableOpacity
                            className='rounded-2xl px-4 py-3 flex-row items-center justify-between'
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderWidth: 1,
                                borderColor: '#E5E7EB',
                            }}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={{ color: time ? '#1A1A1A' : '#9CA3AF' }}>
                                {time || 'HH:mm'}
                            </Text>
                            <MaterialIcons name='access-time' size={20} color='#7B5FFF' />
                        </TouchableOpacity>
                    </View>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode='date'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={selectedTime}
                        mode='time'
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleTimeChange}
                        is24Hour={true}
                    />
                )}

                {/* Location */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                        Local
                    </Text>
                    <TextInput
                        className='rounded-2xl px-4 py-3'
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            color: '#1A1A1A',
                        }}
                        placeholder='Ex: Hospital São Lucas'
                        placeholderTextColor='#9CA3AF'
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>

                {/* Notes */}
                <View className='mb-6'>
                    <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                        Observações
                    </Text>
                    <TextInput
                        className='rounded-2xl px-4 py-3'
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                            color: '#1A1A1A',
                            minHeight: 80,
                            textAlignVertical: 'top',
                        }}
                        placeholder='Notas adicionais sobre a consulta'
                        placeholderTextColor='#9CA3AF'
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    className='rounded-full py-4 mb-8'
                    style={{ backgroundColor: '#7B5FFF' }}
                    onPress={handleSubmit}
                >
                    <Text className='text-center text-lg font-bold' style={{ color: '#FFFFFF' }}>
                        Agendar Consulta
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
