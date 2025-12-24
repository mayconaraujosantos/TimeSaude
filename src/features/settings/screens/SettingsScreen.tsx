import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useState } from 'react';
import { useTheme } from '@/shared/hooks/useTheme';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList>;

export function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { colors, actualTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);

  const handleBackup = () => {
    Alert.alert(
      'Backup',
      'Seu backup foi realizado com sucesso! Todos os dados foram salvos na nuvem.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Privacidade',
      'Política de Privacidade\n\nSeus dados são criptografados e armazenados com segurança. Não compartilhamos suas informações com terceiros.',
      [{ text: 'OK' }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Limpar Dados',
      'Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sucesso', 'Todos os dados foram removidos.');
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Sobre o TimeSaúde',
      'TimeSaúde v1.0.0\n\nAplicativo para gerenciamento de medicamentos e consultas médicas.\n\nDesenvolvido com \u2764\ufe0f para ajudar você a cuidar da sua saúde.',
      [{ text: 'OK' }]
    );
  };

  const handleTerms = () => {
    Alert.alert(
      'Termos de Uso',
      'Termos de Uso do TimeSaúde\n\n1. Aceitação dos Termos\n2. Uso do Serviço\n3. Privacidade e Dados\n4. Limitações de Responsabilidade\n\nAo usar este aplicativo, você concorda com nossos termos.',
      [{ text: 'OK' }]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Ajuda',
      'Central de Ajuda\n\n\u2022 Como adicionar medicamentos?\n\u2022 Como agendar consultas?\n\u2022 Como configurar lembretes?\n\nPara mais ajuda, entre em contato:\nsuporte@timesaude.com',
      [{ text: 'OK' }]
    );
  };

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
            Configurações
          </Text>
          <View className='w-10' />
        </View>
      </View>

      <ScrollView className='flex-1 px-6 pt-6'>
        {/* Notifications Section */}
        <View className='mb-6'>
          <Text className='text-lg font-bold mb-3' style={{ color: colors.textPrimary }}>
            Notificações
          </Text>

          <View className='rounded-3xl p-4' style={{ backgroundColor: colors.surface }}>
            <View
              className='flex-row justify-between items-center py-3 border-b'
              style={{ borderColor: colors.border }}
            >
              <View className='flex-row items-center gap-3 flex-1'>
                <MaterialIcons name='notifications' size={24} color={colors.primary} />
                <View className='flex-1'>
                  <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                    Notificações Push
                  </Text>
                  <Text className='text-xs' style={{ color: colors.textSecondary }}>
                    Receba alertas de medicamentos
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                thumbColor={notifications ? colors.primary : colors.textLight}
              />
            </View>

            <View
              className='flex-row justify-between items-center py-3 border-b'
              style={{ borderColor: colors.border }}
            >
              <View className='flex-row items-center gap-3 flex-1'>
                <MaterialIcons name='volume-up' size={24} color={colors.primary} />
                <View className='flex-1'>
                  <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                    Som
                  </Text>
                  <Text className='text-xs' style={{ color: colors.textSecondary }}>
                    Alertas sonoros
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                thumbColor={soundEnabled ? colors.primary : colors.textLight}
              />
            </View>

            <View
              className='flex-row justify-between items-center py-3 border-b'
              style={{ borderColor: colors.border }}
            >
              <View className='flex-row items-center gap-3 flex-1'>
                <MaterialIcons name='vibration' size={24} color={colors.primary} />
                <View className='flex-1'>
                  <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                    Vibração
                  </Text>
                  <Text className='text-xs' style={{ color: colors.textSecondary }}>
                    Vibrar em alertas
                  </Text>
                </View>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                thumbColor={vibrationEnabled ? colors.primary : colors.textLight}
              />
            </View>

            <View className='flex-row justify-between items-center py-3'>
              <View className='flex-row items-center gap-3 flex-1'>
                <MaterialIcons name='alarm' size={24} color={colors.primary} />
                <View className='flex-1'>
                  <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                    Lembrete Diário
                  </Text>
                  <Text className='text-xs' style={{ color: colors.textSecondary }}>
                    Resumo diário às 9h
                  </Text>
                </View>
              </View>
              <Switch
                value={dailyReminder}
                onValueChange={setDailyReminder}
                trackColor={{ false: colors.border, true: `${colors.primary}80` }}
                thumbColor={dailyReminder ? colors.primary : colors.textLight}
              />
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View className='mb-6'>
          <Text className='text-lg font-bold mb-3' style={{ color: colors.textPrimary }}>
            Aparência
          </Text>

          <View className='rounded-3xl' style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity
              className='flex-row justify-between items-center p-4 border-b'
              style={{ borderColor: colors.border }}
              onPress={() => navigation.navigate('ThemeSettings' as never)}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons
                  name={actualTheme === 'dark' ? 'dark-mode' : 'light-mode'}
                  size={24}
                  color={colors.primary}
                />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Tema
                </Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Text className='text-sm' style={{ color: colors.textSecondary }}>
                  {actualTheme === 'dark' ? 'Escuro' : 'Claro'}
                </Text>
                <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className='flex-row justify-between items-center p-4'>
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='language' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Idioma
                </Text>
              </View>
              <View className='flex-row items-center gap-2'>
                <Text className='text-sm' style={{ color: colors.textSecondary }}>
                  Português
                </Text>
                <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Data & Privacy Section */}
        <View className='mb-6'>
          <Text className='text-lg font-bold mb-3' style={{ color: colors.textPrimary }}>
            Dados e Privacidade
          </Text>

          <View className='rounded-3xl' style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity
              className='flex-row justify-between items-center p-4 border-b'
              style={{ borderColor: colors.border }}
              onPress={handleBackup}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='backup' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Backup
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row justify-between items-center p-4 border-b'
              style={{ borderColor: colors.border }}
              onPress={handlePrivacy}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='security' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Privacidade
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row justify-between items-center p-4'
              onPress={handleClearData}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='delete-outline' size={24} color={colors.error} />
                <Text className='text-base font-medium' style={{ color: colors.error }}>
                  Limpar Dados
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View className='mb-6'>
          <Text className='text-lg font-bold mb-3' style={{ color: colors.textPrimary }}>
            Sobre
          </Text>

          <View className='rounded-3xl' style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity
              className='flex-row justify-between items-center p-4 border-b'
              style={{ borderColor: colors.border }}
              onPress={handleAbout}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='info-outline' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Sobre o App
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row justify-between items-center p-4 border-b'
              style={{ borderColor: colors.border }}
              onPress={handleTerms}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='description' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Termos de Uso
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row justify-between items-center p-4'
              onPress={handleHelp}
            >
              <View className='flex-row items-center gap-3'>
                <MaterialIcons name='help-outline' size={24} color={colors.primary} />
                <Text className='text-base font-medium' style={{ color: colors.textPrimary }}>
                  Ajuda
                </Text>
              </View>
              <MaterialIcons name='chevron-right' size={20} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        <View className='items-center py-6 mb-8'>
          <Text className='text-xs' style={{ color: colors.textLight }}>
            TimeSaúde v1.0.0
          </Text>
          <Text className='text-xs mt-1' style={{ color: colors.textLight }}>
            © 2025 Todos os direitos reservados
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
