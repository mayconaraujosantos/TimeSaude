import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
    label: string;
    value: Date | undefined;
    onSelect: (date: Date | undefined) => void;
    placeholder?: string;
    error?: string;
    required?: boolean;
    minimumDate?: Date;
}

export function DatePicker({
    label,
    value,
    onSelect,
    placeholder = 'Selecione a data',
    error,
    required = false,
    minimumDate
}: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempDate, setTempDate] = useState<Date>(value || new Date());

    const formatDate = (date: Date | undefined) => {
        if (!date) return placeholder;
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleConfirm = () => {
        onSelect(tempDate);
        setIsOpen(false);
    };

    const handleClear = () => {
        onSelect(undefined);
        setIsOpen(false);
    };

    return (
        <View>
            <Text className='text-sm font-medium text-text-primary mb-2'>
                {label} {required && <Text className='text-red-500'>*</Text>}
            </Text>

            <TouchableOpacity
                onPress={() => setIsOpen(true)}
                className='bg-white rounded-xl px-4 py-3 border border-gray-200'
                style={{ borderColor: error ? '#EF4444' : '#E5E7EB' }}
            >
                <View className='flex-row items-center gap-3'>
                    <MaterialIcons name='calendar-today' size={20} color='#7B5FFF' />
                    <Text
                        className={value ? 'flex-1 text-text-primary' : 'flex-1 text-text-secondary'}
                    >
                        {formatDate(value)}
                    </Text>
                    {value && (
                        <TouchableOpacity
                            onPress={(e) => {
                                e.stopPropagation();
                                onSelect(undefined);
                            }}
                        >
                            <MaterialIcons name='close' size={20} color='#9CA3AF' />
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>

            {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}

            {Platform.OS === 'android' && isOpen && (
                <DateTimePicker
                    value={tempDate}
                    mode='date'
                    display='default'
                    minimumDate={minimumDate}
                    onChange={(event, selectedDate) => {
                        setIsOpen(false);
                        if (event.type === 'set' && selectedDate) {
                            onSelect(selectedDate);
                        }
                    }}
                />
            )}

            {Platform.OS === 'ios' && (
                <Modal
                    visible={isOpen}
                    transparent
                    animationType='slide'
                    onRequestClose={() => setIsOpen(false)}
                >
                    <TouchableOpacity
                        className='flex-1 bg-black/50 justify-end'
                        activeOpacity={1}
                        onPress={() => setIsOpen(false)}
                    >
                        <View className='bg-white rounded-t-[32px]'>
                            <View className='px-6 py-4 border-b border-gray-200'>
                                <View className='flex-row items-center justify-between'>
                                    <Text className='text-lg font-bold text-text-primary'>
                                        {label}
                                    </Text>
                                    <TouchableOpacity onPress={() => setIsOpen(false)}>
                                        <MaterialIcons name='close' size={24} color='#6B7280' />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='px-6 py-4'>
                                <DateTimePicker
                                    value={tempDate}
                                    mode='date'
                                    display='spinner'
                                    minimumDate={minimumDate}
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setTempDate(selectedDate);
                                        }
                                    }}
                                />

                                <View className='flex-row gap-3 mt-4'>
                                    {!required && (
                                        <TouchableOpacity
                                            onPress={handleClear}
                                            className='flex-1 py-3 rounded-xl border border-gray-300'
                                        >
                                            <Text className='text-center font-medium text-text-secondary'>
                                                Limpar
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        onPress={handleConfirm}
                                        className='flex-1 py-3 rounded-xl'
                                        style={{ backgroundColor: '#7B5FFF' }}
                                    >
                                        <Text className='text-center font-medium text-white'>
                                            Confirmar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
}
