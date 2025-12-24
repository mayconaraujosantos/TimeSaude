import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

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

  const selectedOption = options.find(opt => opt.value === value);

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
        <View className='flex-row items-center justify-between'>
          <Text className={selectedOption ? 'text-text-primary' : 'text-text-secondary'}>
            {selectedOption?.label || placeholder}
          </Text>
          <MaterialIcons
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color='#9CA3AF'
          />
        </View>
      </TouchableOpacity>

      {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}

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
          <View className='bg-white rounded-t-[32px] max-h-[70%]'>
            <View className='px-6 py-4 border-b border-gray-200'>
              <View className='flex-row items-center justify-between'>
                <Text className='text-lg font-bold text-text-primary'>{label}</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <MaterialIcons name='close' size={24} color='#6B7280' />
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
                  className='py-4 border-b border-gray-100'
                >
                  <View className='flex-row items-center justify-between'>
                    <View className='flex-row items-center gap-3'>
                      {option.icon && <Text className='text-2xl'>{option.icon}</Text>}
                      <Text className='text-base text-text-primary'>{option.label}</Text>
                    </View>
                    {option.value === value && (
                      <MaterialIcons name='check' size={24} color='#7B5FFF' />
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
