import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const COLORS = [
  { name: 'Azul', value: '#3B82F6' },
  { name: 'Roxo', value: '#7B5FFF' },
  { name: 'Rosa', value: '#FF6B9D' },
  { name: 'Verde', value: '#10B981' },
  { name: 'Laranja', value: '#F59E0B' },
  { name: 'Vermelho', value: '#EF4444' },
  { name: 'Amarelo', value: '#FBBF24' },
  { name: 'Ciano', value: '#06B6D4' },
  { name: 'Índigo', value: '#6366F1' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Lime', value: '#84CC16' },
];

interface ColorPickerProps {
  label: string;
  value: string;
  onSelect: (color: string) => void;
  required?: boolean;
}

export function ColorPicker({ label, value, onSelect, required = false }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedColor = COLORS.find(c => c.value === value) || COLORS[0]!;

  return (
    <View>
      <Text className='text-sm font-medium text-text-primary mb-2'>
        {label} {required && <Text className='text-red-500'>*</Text>}
      </Text>

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className='bg-white rounded-xl px-4 py-3 border border-gray-200'
      >
        <View className='flex-row items-center gap-3'>
          <View
            className='w-8 h-8 rounded-full border-2 border-gray-200'
            style={{ backgroundColor: value }}
          />
          <Text className='flex-1 text-text-primary'>{selectedColor.name}</Text>
          <MaterialIcons name='keyboard-arrow-down' size={24} color='#9CA3AF' />
        </View>
      </TouchableOpacity>

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
                <Text className='text-lg font-bold text-text-primary'>{label}</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <MaterialIcons name='close' size={24} color='#6B7280' />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className='px-6 py-4'>
              <View className='flex-row flex-wrap gap-3'>
                {COLORS.map(color => (
                  <TouchableOpacity
                    key={color.value}
                    onPress={() => {
                      onSelect(color.value);
                      setIsOpen(false);
                    }}
                    className='items-center'
                    style={{ width: '30%' }}
                  >
                    <View className='relative items-center justify-center'>
                      <View
                        className='w-16 h-16 rounded-full border-2'
                        style={{
                          backgroundColor: color.value,
                          borderColor: color.value === value ? '#1A1A1A' : '#E5E7EB',
                          borderWidth: color.value === value ? 3 : 2,
                        }}
                      />
                      {color.value === value && (
                        <View className='absolute'>
                          <MaterialIcons name='check' size={28} color='#FFFFFF' />
                        </View>
                      )}
                    </View>
                    <Text className='text-xs text-text-secondary mt-2 text-center'>
                      {color.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className='h-6' />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
