import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../shared/hooks/useTheme';

type Theme = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: Theme;
  label: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const themeOptions: ThemeOption[] = [
  {
    value: 'light',
    label: 'Claro',
    description: 'Tema claro sempre ativo',
    icon: 'light-mode',
  },
  {
    value: 'dark',
    label: 'Escuro',
    description: 'Tema escuro sempre ativo',
    icon: 'dark-mode',
  },
  {
    value: 'system',
    label: 'Sistema',
    description: 'Segue a configuração do sistema',
    icon: 'brightness-auto',
  },
];

export function ThemeSettingsScreen() {
  const navigation = useNavigation();
  const { theme, setTheme, colors } = useTheme();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View
        className='px-6 pt-16 pb-6'
        style={{
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View className='flex-row items-center justify-between'>
          <TouchableOpacity
            className='w-10 h-10 items-center justify-center rounded-full'
            style={{ backgroundColor: colors.surfaceVariant }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='arrow-back' size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text className='text-2xl font-bold' style={{ color: colors.textPrimary }}>
            Tema
          </Text>
          <View className='w-10' />
        </View>
      </View>

      <ScrollView className='flex-1 px-6 pt-6'>
        {/* Preview Card */}
        <View
          className='rounded-3xl p-6 mb-6'
          style={{
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View className='flex-row items-center mb-4'>
            <View
              className='w-12 h-12 rounded-2xl items-center justify-center mr-4'
              style={{ backgroundColor: colors.primary }}
            >
              <MaterialIcons name='palette' size={24} color={colors.textOnPrimary} />
            </View>
            <View className='flex-1'>
              <Text className='text-lg font-bold mb-1' style={{ color: colors.textPrimary }}>
                Preview do Tema
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Veja como o app ficará
              </Text>
            </View>
          </View>

          {/* Preview Colors */}
          <View className='flex-row gap-2'>
            <View className='flex-1 h-12 rounded-xl' style={{ backgroundColor: colors.primary }} />
            <View
              className='flex-1 h-12 rounded-xl'
              style={{ backgroundColor: colors.secondary }}
            />
            <View className='flex-1 h-12 rounded-xl' style={{ backgroundColor: colors.accent }} />
          </View>
        </View>

        {/* Theme Options */}
        <View className='mb-6'>
          <Text className='text-sm font-semibold mb-3 px-1' style={{ color: colors.textSecondary }}>
            ESCOLHER TEMA
          </Text>
          <View className='gap-3'>
            {themeOptions.map(option => {
              const isSelected = theme === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  className='rounded-2xl p-4'
                  style={{
                    backgroundColor: colors.surface,
                    borderWidth: 2,
                    borderColor: isSelected ? colors.primary : colors.border,
                    shadowColor: colors.shadow,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                  onPress={() => setTheme(option.value)}
                >
                  <View className='flex-row items-center'>
                    <View
                      className='w-12 h-12 rounded-2xl items-center justify-center mr-4'
                      style={{
                        backgroundColor: isSelected ? `${colors.primary}15` : colors.surfaceVariant,
                      }}
                    >
                      <MaterialIcons
                        name={option.icon}
                        size={24}
                        color={isSelected ? colors.primary : colors.textSecondary}
                      />
                    </View>
                    <View className='flex-1'>
                      <Text
                        className='text-base font-semibold mb-1'
                        style={{ color: colors.textPrimary }}
                      >
                        {option.label}
                      </Text>
                      <Text className='text-sm' style={{ color: colors.textSecondary }}>
                        {option.description}
                      </Text>
                    </View>
                    {isSelected && (
                      <View
                        className='w-6 h-6 rounded-full items-center justify-center'
                        style={{ backgroundColor: colors.primary }}
                      >
                        <MaterialIcons name='check' size={16} color={colors.textOnPrimary} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Info Card */}
        <View className='rounded-2xl p-4 mb-6' style={{ backgroundColor: `${colors.info}15` }}>
          <View className='flex-row'>
            <MaterialIcons
              name='info'
              size={20}
              color={colors.info}
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <Text className='flex-1 text-sm' style={{ color: colors.textSecondary }}>
              O tema do sistema segue automaticamente as configurações do seu dispositivo. Você pode
              mudá-lo nas configurações do sistema operacional.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
