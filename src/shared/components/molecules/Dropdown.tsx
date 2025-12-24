import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';

interface DropdownOption<T = string> {
  label: string;
  value: T;
  icon?: string;
}

interface DropdownProps<T = string> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onSelect: (value: T) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function Dropdown<T extends string = string>({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Selecione...',
  error,
  required = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const selectedOption = options.find(opt => opt.value === value);

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
        <View className='flex-row items-center justify-between'>
          <Text style={{ color: selectedOption ? colors.textPrimary : colors.textSecondary }}>
            {selectedOption?.label || placeholder}
          </Text>
          <MaterialIcons
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {error && (
        <Text className='text-xs mt-1' style={{ color: colors.error }}>
          {error}
        </Text>
      )}

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
          <View
            className='rounded-t-[32px] max-h-[70%]'
            style={{ backgroundColor: colors.surface }}
          >
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

            <ScrollView className='px-6 py-2'>
              {options.map(option => (
                <TouchableOpacity
                  key={String(option.value)}
                  onPress={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className='py-4 border-b'
                  style={{ borderColor: colors.borderLight }}
                >
                  <View className='flex-row items-center justify-between'>
                    <View className='flex-row items-center gap-3'>
                      {option.icon && <Text className='text-2xl'>{option.icon}</Text>}
                      <Text className='text-base' style={{ color: colors.textPrimary }}>
                        {option.label}
                      </Text>
                    </View>
                    {option.value === value && (
                      <MaterialIcons name='check' size={24} color={colors.primary} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
