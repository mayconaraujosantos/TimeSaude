import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { useMedications } from '@/features/medication/hooks/useMedications';
import { useAppointments } from '@/features/appointment/hooks/useAppointments';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useTheme } from '@/shared/hooks/useTheme';
import { useState, useEffect, useRef } from 'react';
import type { Medication } from '@/features/medication/model';
import type { Appointment } from '@/features/appointment/model';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { medications, isOfflineMode, deleteMedication } = useMedications();
  const { getUpcomingAppointments } = useAppointments();
  const { logout, user } = useAuth();
  const { colors } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [currentCabinetIndex, setCurrentCabinetIndex] = useState(0);
  const cabinetScrollRef = useRef<ScrollView>(null);

  // Mostra até 6 medicamentos no cabinet (scroll horizontal)
  const cabinetMedications = medications.slice(0, 6);

  // Pega o próximo medicamento (primeiro da lista)
  const nextMedication = medications[0];

  const handleCabinetScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardWidth = 196; // 180px width + 16px gap
    const index = Math.round(scrollPosition / cardWidth);
    setCurrentCabinetIndex(index);
  };

  const handleDeleteMedication = (med: Medication) => {
    Alert.alert('Excluir Medicamento', `Tem certeza que deseja excluir ${med.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMedication(med.id);
          } catch (_error) {
            Alert.alert('Erro', 'Não foi possível excluir o medicamento');
          }
        },
      },
    ]);
  };

  const openMedicationOptions = (med: Medication) => {
    Alert.alert(med.name, 'Escolha uma ação', [
      {
        text: 'Ver detalhes',
        onPress: () => navigation.navigate('MedicationList'),
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => handleDeleteMedication(med),
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  useEffect(() => {
    const loadNextAppointment = async () => {
      const upcoming = await getUpcomingAppointments();
      if (upcoming.length > 0) {
        setNextAppointment(upcoming[0] || null);
      }
    };
    loadNextAppointment();
  }, [getUpcomingAppointments]);

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      {/* Offline Mode Banner */}
      {isOfflineMode && (
        <View className='bg-amber-500 px-4 py-2 flex-row items-center justify-center'>
          <MaterialIcons name='cloud-off' size={18} color='white' />
          <Text className='text-white font-semibold ml-2 text-sm'>
            Modo Offline - Dados de Exemplo
          </Text>
        </View>
      )}

      <ScrollView className='flex-1'>
        {/* Header */}
        <View
          className='rounded-b-[40px] px-6 pt-16 pb-6 mb-6'
          style={{ backgroundColor: colors.surface }}
        >
          <View className='flex-row justify-between items-start'>
            <View className='flex-row items-center gap-4'>
              {/* Avatar com gradiente */}
              <LinearGradient
                colors={['#FF6B9D', '#7B5FFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='w-14 h-14 rounded-full items-center justify-center'
              >
                {user?.profileImage ? (
                  <Image
                    source={{ uri: user.profileImage }}
                    className='w-14 h-14 rounded-full'
                    style={{ width: 56, height: 56, borderRadius: 28 }}
                  />
                ) : (
                  <Text className='text-2xl'>👩</Text>
                )}
              </LinearGradient>
              <View>
                <Text className='text-2xl font-bold' style={{ color: colors.textPrimary }}>
                  Hi {user?.name?.split(' ')[0] || 'Ana'}!
                </Text>
                <Text className='text-sm' style={{ color: colors.textSecondary }}>
                  How do you feel today?
                </Text>
              </View>
            </View>
            <TouchableOpacity className='p-2' onPress={() => setMenuVisible(true)}>
              <MaterialIcons name='menu' size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View className='px-6 gap-6'>
          {/* Your Next Pill */}
          <View>
            <Text className='text-xs mb-2' style={{ color: colors.textLight }}>
              {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
            </Text>
            <Text className='text-xl font-bold mb-4' style={{ color: colors.textPrimary }}>
              Your Next Pill
            </Text>

            {nextMedication ? (
              <View
                className='rounded-[32px] p-5 flex-row items-center justify-between'
                style={{
                  backgroundColor: colors.cardPurple,
                  borderRadius: 32,
                  borderWidth: 1,
                  borderColor: colors.border,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#7B5FFF',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                    },
                    android: {
                      elevation: 2,
                    },
                  }),
                }}
              >
                <View className='flex-row items-center gap-4 flex-1'>
                  <View
                    className='w-14 h-14 rounded-[20px] items-center justify-center'
                    style={{ backgroundColor: colors.surface, borderRadius: 20 }}
                  >
                    <Text className='text-3xl'>💊</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-lg font-bold' style={{ color: colors.textPrimary }}>
                      {nextMedication.name}
                    </Text>
                    <Text className='text-sm' style={{ color: colors.textSecondary }}>
                      {nextMedication.dosage} • {nextMedication.frequency}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className='p-2'
                  onPress={() => openMedicationOptions(nextMedication)}
                >
                  <MaterialIcons name='more-vert' size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                className='rounded-[32px] p-5'
                style={{
                  backgroundColor: colors.surfaceVariant,
                  borderWidth: 2,
                  borderColor: colors.border,
                  borderStyle: 'dashed',
                }}
              >
                <Text className='text-center text-sm' style={{ color: colors.textLight }}>
                  Nenhum medicamento cadastrado
                </Text>
                <TouchableOpacity
                  className='mt-3 py-2'
                  onPress={() => navigation.navigate('AddMedication')}
                >
                  <Text className='text-center font-medium' style={{ color: colors.primary }}>
                    Adicionar medicamento
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Your Next Appointment */}
          <View>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-xl font-bold' style={{ color: colors.textPrimary }}>
                Your Next Appointment
              </Text>
              <TouchableOpacity
                className='flex-row items-center gap-1'
                onPress={() => navigation.navigate('AppointmentList')}
              >
                <Text className='text-sm font-medium' style={{ color: colors.primary }}>
                  Ver todas
                </Text>
                <MaterialIcons name='arrow-forward' size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {nextAppointment ? (
              <View
                className='rounded-[32px] p-5 flex-row items-center justify-between'
                style={{
                  backgroundColor: colors.cardBlue,
                  borderRadius: 32,
                  borderWidth: 1,
                  borderColor: colors.border,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#7B5FFF',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                    },
                    android: {
                      elevation: 2,
                    },
                  }),
                }}
              >
                <View className='flex-row items-center gap-4 flex-1'>
                  <View
                    className='w-14 h-14 rounded-[20px] items-center justify-center'
                    style={{ backgroundColor: colors.surface, borderRadius: 20 }}
                  >
                    <MaterialIcons name='event-note' size={28} color={colors.primary} />
                  </View>
                  <View className='flex-1'>
                    <Text className='text-lg font-bold' style={{ color: colors.textPrimary }}>
                      {nextAppointment.title}
                    </Text>
                    <Text className='text-sm' style={{ color: colors.textSecondary }}>
                      {nextAppointment.description || nextAppointment.location}
                    </Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-base font-bold' style={{ color: colors.textPrimary }}>
                    {new Date(nextAppointment.date).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </Text>
                  <Text className='text-sm' style={{ color: colors.textSecondary }}>
                    {nextAppointment.time}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                className='rounded-[32px] p-5'
                style={{
                  backgroundColor: colors.surfaceVariant,
                  borderWidth: 2,
                  borderColor: colors.border,
                  borderStyle: 'dashed',
                }}
              >
                <Text className='text-center text-sm mb-3' style={{ color: colors.textLight }}>
                  Nenhuma consulta agendada
                </Text>
                <TouchableOpacity
                  className='py-2'
                  onPress={() => navigation.navigate('AddAppointment')}
                >
                  <Text className='text-center font-medium' style={{ color: colors.primary }}>
                    Agendar consulta
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Your Cabinet */}
          <View className='mb-6'>
            <View className='flex-row justify-between items-center mb-4'>
              <Text className='text-xl font-bold' style={{ color: colors.textPrimary }}>
                Your Cabinet
              </Text>
              <TouchableOpacity
                className='flex-row items-center gap-1'
                onPress={() => navigation.navigate('MedicationList')}
              >
                <Text className='text-sm font-medium' style={{ color: colors.primary }}>
                  View all ({medications.length})
                </Text>
                <MaterialIcons name='arrow-forward' size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Scroll Horizontal para mostrar mais medicamentos */}
            <View style={{ position: 'relative' }}>
              <ScrollView
                ref={cabinetScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingRight: 24, paddingBottom: 20 }}
                snapToInterval={196} // 180px width + 16px gap
                decelerationRate='fast'
                onScroll={handleCabinetScroll}
                scrollEventThrottle={16}
              >
                {cabinetMedications.length > 0 ? (
                  cabinetMedications.map((med, index) => (
                    <View
                      key={med.id}
                      className='rounded-[32px] p-5'
                      style={{
                        width: 180,
                        backgroundColor: index % 2 === 0 ? colors.cardPurple : colors.cardPink,
                        borderRadius: 32,
                        borderWidth: 1,
                        borderColor: colors.border,
                        ...Platform.select({
                          ios: {
                            shadowColor: index % 2 === 0 ? '#7B5FFF' : '#FF6B9D',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 6,
                          },
                          android: {
                            elevation: 2,
                          },
                        }),
                      }}
                    >
                      <View className='flex-row justify-between items-start mb-4'>
                        <View
                          className='w-12 h-12 rounded-[16px] items-center justify-center'
                          style={{ backgroundColor: colors.surface, borderRadius: 16 }}
                        >
                          <Text className='text-2xl'>💊</Text>
                        </View>
                        <TouchableOpacity
                          className='p-1'
                          onPress={() => openMedicationOptions(med)}
                        >
                          <MaterialIcons name='more-vert' size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                      </View>
                      <Text
                        className='text-base font-bold mb-1'
                        style={{ color: colors.textPrimary }}
                        numberOfLines={1}
                      >
                        {med.name}
                      </Text>
                      <Text className='text-xs mb-2' style={{ color: colors.textSecondary }}>
                        {med.dosage}
                      </Text>
                      <Text className='text-xs' style={{ color: colors.textLight }}>
                        {med.frequency}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View
                    className='rounded-[32px] p-5'
                    style={{
                      width: 180,
                      backgroundColor: colors.surfaceVariant,
                      borderWidth: 2,
                      borderColor: colors.border,
                      borderStyle: 'dashed',
                    }}
                  >
                    <Text className='text-center text-sm' style={{ color: colors.textLight }}>
                      Seu armário está vazio
                    </Text>
                  </View>
                )}
              </ScrollView>

              {/* Gradiente na direita para indicar mais conteúdo */}
              {cabinetMedications.length > 1 &&
                currentCabinetIndex < cabinetMedications.length - 1 && (
                  <LinearGradient
                    colors={['transparent', 'transparent', `${colors.background}40`]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: 60,
                      pointerEvents: 'none',
                    }}
                  />
                )}

              {/* Indicador de navegação (dots) */}
              {cabinetMedications.length > 1 && (
                <View className='flex-row justify-center gap-2 mt-6 mb-2'>
                  {cabinetMedications.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        cabinetScrollRef.current?.scrollTo({
                          x: index * 196,
                          animated: true,
                        });
                      }}
                    >
                      <View
                        style={{
                          width: currentCabinetIndex === index ? 24 : 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor:
                            currentCabinetIndex === index ? colors.primary : colors.border,
                          opacity: currentCabinetIndex === index ? 1 : 0.5,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Bottom spacing */}
          <View className='h-32' />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        className='absolute bottom-0 left-0 right-0 rounded-t-[32px]'
        style={{
          backgroundColor: colors.surface,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        }}
      >
        <View className='flex-row items-center justify-around px-8' style={{ height: 80 }}>
          <TouchableOpacity
            className='items-center justify-center w-14 h-14'
            onPress={() => navigation.navigate('Home')}
          >
            <MaterialIcons name='home' size={32} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            className='items-center justify-center rounded-full -mt-10'
            style={{
              width: 64,
              height: 64,
              backgroundColor: colors.primary,
              borderRadius: 32,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 12,
            }}
            onPress={() => navigation.navigate('AddMedication')}
          >
            <MaterialIcons name='add' size={36} color={colors.textOnPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            className='items-center justify-center w-14 h-14'
            onPress={() => navigation.navigate('Calendar')}
          >
            <MaterialIcons name='calendar-today' size={28} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType='slide'
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          className='flex-1 bg-black/50'
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View
            className='absolute bottom-0 left-0 right-0 rounded-t-[32px] p-6'
            style={{
              backgroundColor: colors.surface,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 12,
            }}
          >
            <Text className='text-xl font-bold mb-6' style={{ color: colors.textPrimary }}>
              Menu
            </Text>

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('MedicationList');
              }}
            >
              <MaterialIcons name='medication' size={24} color={colors.primary} />
              <Text className='text-base' style={{ color: colors.textPrimary }}>
                Meus Medicamentos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Calendar');
              }}
            >
              <MaterialIcons name='calendar-today' size={24} color={colors.primary} />
              <Text className='text-base' style={{ color: colors.textPrimary }}>
                Calendário
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('AppointmentList');
              }}
            >
              <MaterialIcons name='event' size={24} color={colors.primary} />
              <Text className='text-base' style={{ color: colors.textPrimary }}>
                Minhas Consultas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <MaterialIcons name='settings' size={24} color={colors.primary} />
              <Text className='text-base' style={{ color: colors.textPrimary }}>
                Configurações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Profile');
              }}
            >
              <MaterialIcons name='person' size={24} color={colors.primary} />
              <Text className='text-base' style={{ color: colors.textPrimary }}>
                Perfil
              </Text>
            </TouchableOpacity>

            <View className='border-t my-2' style={{ borderColor: colors.border }} />

            <TouchableOpacity
              className='flex-row items-center gap-4 py-4'
              onPress={() => {
                setMenuVisible(false);
                Alert.alert('Sair', 'Tem certeza que deseja sair?', [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                      await logout();
                    },
                  },
                ]);
              }}
            >
              <MaterialIcons name='logout' size={24} color='#EF4444' />
              <Text className='text-base' style={{ color: '#EF4444' }}>
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
