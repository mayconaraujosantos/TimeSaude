import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/shared/hooks/useTheme';

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
  minimumDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const { colors } = useTheme();

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
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
      <Text className='text-sm font-medium mb-2' style={{ color: colors.textPrimary }}>
        {label} {required && <Text style={{ color: colors.error }}>*</Text>}
      </Text>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className='rounded-xl px-4 py-3 border'
        style={{
          backgroundColor: colors.surface,
          borderColor: error ? colors.error : colors.border,
        }}
      >
        <View className='flex-row items-center gap-3'>
          <MaterialIcons name='calendar-today' size={20} color={colors.primary} />
          <Text
            className='flex-1'
            style={{ color: value ? colors.textPrimary : colors.textSecondary }}
          >
            {formatDate(value)}
          </Text>
          {value && (
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                onSelect(undefined);
              }}
            >
              <MaterialIcons name='close' size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {error && (
        <Text className='text-xs mt-1' style={{ color: colors.error }}>
          {error}
        </Text>
      )}

      {Platform.OS === 'android' && isOpen && (
        <DateTimePicker
          value={tempDate}
          mode='date'
          display='default'
          {...(minimumDate && { minimumDate })}
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
            className='flex-1 justify-end'
            style={{ backgroundColor: colors.overlay }}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View className='rounded-t-[32px]' style={{ backgroundColor: colors.surface }}>
              <View className='px-6 py-4 border-b' style={{ borderColor: colors.border }}>
                <View className='flex-row items-center justify-between'>
                  <Text className='text-lg font-bold' style={{ color: colors.textPrimary }}>
                    {label}
                  </Text>
                  <TouchableOpacity onPress={() => setIsOpen(false)}>
                    <MaterialIcons name='close' size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View className='px-6 py-4'>
                <DateTimePicker
                  value={tempDate}
                  mode='date'
                  display='spinner'
                  {...(minimumDate && { minimumDate })}
                  onChange={(_event, selectedDate) => {
                    if (selectedDate) {
                      setTempDate(selectedDate);
                    }
                  }}
                />

                <View className='flex-row gap-3 mt-4'>
                  {!required && (
                    <TouchableOpacity
                      onPress={handleClear}
                      className='flex-1 py-3 rounded-xl border'
                      style={{ borderColor: colors.border }}
                    >
                      <Text
                        className='text-center font-medium'
                        style={{ color: colors.textSecondary }}
                      >
                        Limpar
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={handleConfirm}
                    className='flex-1 py-3 rounded-xl'
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Text
                      className='text-center font-medium'
                      style={{ color: colors.textOnPrimary }}
                    >
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
