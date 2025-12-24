import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/shared/hooks/useTheme';

/**
 * Componente de exemplo demonstrando tema dinâmico
 * Use este como referência para criar ou migrar componentes
 */
export function ThemeExampleScreen() {
  const { colors, actualTheme, theme, setTheme } = useTheme();

  const toggleTheme = async () => {
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark';
    await setTheme(newTheme);
  };

  return (
    <ScrollView className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Header com gradiente e sombra */}
      <View
        className='px-6 pt-16 pb-8'
        style={{
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <Text className='text-3xl font-bold mb-2' style={{ color: colors.textPrimary }}>
          Exemplo de Tema
        </Text>
        <Text className='text-base' style={{ color: colors.textSecondary }}>
          Tema atual: {actualTheme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
        </Text>
      </View>

      <View className='p-6 gap-6'>
        {/* Card de Status */}
        <View
          className='rounded-3xl p-6'
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
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <MaterialIcons name='info' size={24} color={colors.primary} />
            </View>
            <View className='flex-1'>
              <Text className='text-lg font-bold mb-1' style={{ color: colors.textPrimary }}>
                Informação
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Este card adapta ao tema
              </Text>
            </View>
          </View>

          <Text className='text-base leading-6' style={{ color: colors.textSecondary }}>
            Todos os elementos neste componente mudam automaticamente quando você altera o tema nas
            configurações. Experimente!
          </Text>
        </View>

        {/* Botões de Ação */}
        <View className='gap-3'>
          {/* Botão Primary */}
          <TouchableOpacity
            className='rounded-2xl py-4 flex-row items-center justify-center'
            style={{ backgroundColor: colors.primary }}
            onPress={toggleTheme}
          >
            <MaterialIcons
              name={actualTheme === 'dark' ? 'light-mode' : 'dark-mode'}
              size={20}
              color={colors.textOnPrimary}
              style={{ marginRight: 8 }}
            />
            <Text className='text-base font-semibold' style={{ color: colors.textOnPrimary }}>
              Alternar para {actualTheme === 'dark' ? 'Claro' : 'Escuro'}
            </Text>
          </TouchableOpacity>

          {/* Botão Secondary */}
          <TouchableOpacity
            className='rounded-2xl py-4'
            style={{
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.border,
            }}
          >
            <Text
              className='text-center text-base font-semibold'
              style={{ color: colors.textPrimary }}
            >
              Botão Secundário
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cards de Estados */}
        <View className='gap-3'>
          {/* Success */}
          <View
            className='rounded-2xl p-4 flex-row items-center'
            style={{ backgroundColor: `${colors.success}15` }}
          >
            <MaterialIcons
              name='check-circle'
              size={24}
              color={colors.success}
              style={{ marginRight: 12 }}
            />
            <View className='flex-1'>
              <Text className='text-base font-semibold mb-1' style={{ color: colors.success }}>
                Sucesso
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Operação completada com êxito
              </Text>
            </View>
          </View>

          {/* Warning */}
          <View
            className='rounded-2xl p-4 flex-row items-center'
            style={{ backgroundColor: `${colors.warning}15` }}
          >
            <MaterialIcons
              name='warning'
              size={24}
              color={colors.warning}
              style={{ marginRight: 12 }}
            />
            <View className='flex-1'>
              <Text className='text-base font-semibold mb-1' style={{ color: colors.warning }}>
                Aviso
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Atenção necessária
              </Text>
            </View>
          </View>

          {/* Error */}
          <View
            className='rounded-2xl p-4 flex-row items-center'
            style={{ backgroundColor: `${colors.error}15` }}
          >
            <MaterialIcons
              name='error'
              size={24}
              color={colors.error}
              style={{ marginRight: 12 }}
            />
            <View className='flex-1'>
              <Text className='text-base font-semibold mb-1' style={{ color: colors.error }}>
                Erro
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Algo deu errado
              </Text>
            </View>
          </View>

          {/* Info */}
          <View
            className='rounded-2xl p-4 flex-row items-center'
            style={{ backgroundColor: `${colors.info}15` }}
          >
            <MaterialIcons name='info' size={24} color={colors.info} style={{ marginRight: 12 }} />
            <View className='flex-1'>
              <Text className='text-base font-semibold mb-1' style={{ color: colors.info }}>
                Informação
              </Text>
              <Text className='text-sm' style={{ color: colors.textSecondary }}>
                Dados importantes
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de Recursos */}
        <View className='rounded-3xl overflow-hidden' style={{ backgroundColor: colors.surface }}>
          {['Background', 'Surface', 'Primary', 'Secondary', 'Border'].map((item, index, arr) => (
            <View
              key={item}
              className='px-4 py-3 flex-row items-center justify-between'
              style={{
                borderBottomWidth: index < arr.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                {item}
              </Text>
              <MaterialIcons name='palette' size={20} color={colors.textLight} />
            </View>
          ))}
        </View>

        {/* Código de Exemplo */}
        <View className='rounded-2xl p-4' style={{ backgroundColor: colors.surfaceVariant }}>
          <Text className='text-xs font-mono mb-2' style={{ color: colors.textSecondary }}>
            const {'{'} colors {'}'} = useTheme();
          </Text>
          <Text className='text-xs font-mono' style={{ color: colors.textSecondary }}>
            backgroundColor: colors.surface
          </Text>
        </View>

        {/* Footer */}
        <Text className='text-center text-sm mt-4' style={{ color: colors.textLight }}>
          Tema: {theme.toUpperCase()}
        </Text>
      </View>
    </ScrollView>
  );
}
