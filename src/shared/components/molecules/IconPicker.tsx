import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';

const ICONS = [
  { name: 'Pílula', value: 'pill', emoji: '💊' },
  { name: 'Seringa', value: 'syringe', emoji: '💉' },
  { name: 'Gotas', value: 'drops', emoji: '💧' },
  { name: 'Cápsula', value: 'capsule', emoji: '⚪' },
  { name: 'Xarope', value: 'syrup', emoji: '🧪' },
  { name: 'Creme', value: 'cream', emoji: '🧴' },
  { name: 'Spray', value: 'spray', emoji: '💨' },
  { name: 'Adesivo', value: 'patch', emoji: '🩹' },
  { name: 'Comprimido', value: 'tablet', emoji: '🔴' },
  { name: 'Inalador', value: 'inhaler', emoji: '🌬️' },
  { name: 'Ampola', value: 'ampoule', emoji: '🧫' },
  { name: 'Vitamina', value: 'vitamin', emoji: '🌟' },
];

interface IconPickerProps {
  label: string;
  value: string;
  onSelect: (icon: string) => void;
  required?: boolean;
}

export function IconPicker({ label, value, onSelect, required = false }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = useTheme();

  const selectedIcon = ICONS.find(i => i.value === value) || ICONS[0]!;

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
          borderColor: colors.border,
        }}
      >
        <View className='flex-row items-center gap-3'>
          <Text className='text-2xl'>{selectedIcon.emoji}</Text>
          <Text className='flex-1' style={{ color: colors.textPrimary }}>
            {selectedIcon.name}
          </Text>
          <MaterialIcons name='keyboard-arrow-down' size={24} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>

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

            <ScrollView className='px-6 py-4'>
              <View className='flex-row flex-wrap gap-3'>
                {ICONS.map(icon => (
                  <TouchableOpacity
                    key={icon.value}
                    onPress={() => {
                      onSelect(icon.value);
                      setIsOpen(false);
                    }}
                    className='items-center p-3 rounded-xl border-2'
                    style={{
                      width: '30%',
                      borderColor: icon.value === value ? colors.primary : colors.border,
                      backgroundColor:
                        icon.value === value ? `${colors.primary}15` : colors.surface,
                    }}
                  >
                    <Text className='text-3xl mb-2'>{icon.emoji}</Text>
                    <Text
                      className='text-xs text-center'
                      style={{
                        color: icon.value === value ? colors.primary : colors.textSecondary,
                      }}
                    >
                      {icon.name}
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
