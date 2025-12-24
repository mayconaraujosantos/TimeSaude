import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { useAppointments } from '../hooks/useAppointments';
import type { Appointment } from '../model';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList>;

const appointmentTypeColors = {
  consultation: '#7B5FFF',
  exam: '#3B82F6',
  procedure: '#EF4444',
  followup: '#10B981',
  other: '#6B7280',
};

const appointmentTypeLabels = {
  consultation: 'Consulta',
  exam: 'Exame',
  procedure: 'Procedimento',
  followup: 'Retorno',
  other: 'Outro',
};

const appointmentTypeIcons = {
  consultation: 'medical-services',
  exam: 'science',
  procedure: 'healing',
  followup: 'event-repeat',
  other: 'event-note',
};

export function AppointmentListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { appointments, loading, deleteAppointment } = useAppointments();

  const handleDelete = (appointment: Appointment) => {
    Alert.alert('Excluir Consulta', `Tem certeza que deseja excluir "${appointment.title}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAppointment(appointment.id);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir a consulta');
          }
        },
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View className='flex-1' style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <View
        className='px-6 pt-16 pb-6'
        style={{
          backgroundColor: '#FFFFFF',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View className='flex-row items-center justify-between mb-4'>
          <TouchableOpacity
            className='w-10 h-10 items-center justify-center rounded-full'
            style={{ backgroundColor: '#F3F4F6' }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='arrow-back' size={24} color='#1A1A1A' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold' style={{ color: '#1A1A1A' }}>
            Minhas Consultas
          </Text>
          <TouchableOpacity
            className='w-10 h-10 items-center justify-center rounded-full'
            style={{ backgroundColor: '#7B5FFF' }}
            onPress={() => navigation.navigate('AddAppointment')}
          >
            <MaterialIcons name='add' size={24} color='#FFFFFF' />
          </TouchableOpacity>
        </View>

        <Text className='text-sm' style={{ color: '#6B7280' }}>
          {appointments.length}{' '}
          {appointments.length === 1 ? 'consulta agendada' : 'consultas agendadas'}
        </Text>
      </View>

      {/* List */}
      <ScrollView className='flex-1 px-6 pt-6'>
        {loading ? (
          <View className='items-center justify-center py-20'>
            <Text style={{ color: '#6B7280' }}>Carregando...</Text>
          </View>
        ) : appointments.length === 0 ? (
          <View className='items-center justify-center py-20'>
            <MaterialIcons name='event-busy' size={64} color='#D1D5DB' />
            <Text className='text-lg font-medium mt-4' style={{ color: '#6B7280' }}>
              Nenhuma consulta agendada
            </Text>
            <TouchableOpacity
              className='mt-6 px-6 py-3 rounded-full'
              style={{ backgroundColor: '#7B5FFF' }}
              onPress={() => navigation.navigate('AddAppointment')}
            >
              <Text className='text-base font-medium' style={{ color: '#FFFFFF' }}>
                Agendar Consulta
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          appointments.map(appointment => (
            <View
              key={appointment.id}
              className='mb-4 rounded-3xl p-5'
              style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className='flex-row items-start justify-between mb-3'>
                <View className='flex-row items-center gap-3 flex-1'>
                  <View
                    className='w-12 h-12 rounded-2xl items-center justify-center'
                    style={{ backgroundColor: `${appointmentTypeColors[appointment.type]}15` }}
                  >
                    <MaterialIcons
                      name={appointmentTypeIcons[appointment.type] as any}
                      size={24}
                      color={appointmentTypeColors[appointment.type]}
                    />
                  </View>
                  <View className='flex-1'>
                    <Text className='text-lg font-bold mb-1' style={{ color: '#1A1A1A' }}>
                      {appointment.title}
                    </Text>
                    <View
                      className='self-start px-2 py-1 rounded-full'
                      style={{ backgroundColor: `${appointmentTypeColors[appointment.type]}15` }}
                    >
                      <Text
                        className='text-xs font-medium'
                        style={{ color: appointmentTypeColors[appointment.type] }}
                      >
                        {appointmentTypeLabels[appointment.type]}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity className='p-2' onPress={() => handleDelete(appointment)}>
                  <MaterialIcons name='delete-outline' size={24} color='#EF4444' />
                </TouchableOpacity>
              </View>

              {appointment.description && (
                <Text className='text-sm mb-3' style={{ color: '#6B7280' }}>
                  {appointment.description}
                </Text>
              )}

              <View
                className='flex-row items-center gap-4 pt-3 border-t'
                style={{ borderColor: '#E5E7EB' }}
              >
                <View className='flex-row items-center gap-2 flex-1'>
                  <MaterialIcons name='event' size={16} color='#6B7280' />
                  <Text className='text-sm' style={{ color: '#6B7280' }}>
                    {formatDate(appointment.date)}
                  </Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <MaterialIcons name='access-time' size={16} color='#6B7280' />
                  <Text className='text-sm' style={{ color: '#6B7280' }}>
                    {appointment.time}
                  </Text>
                </View>
              </View>

              {appointment.location && (
                <View className='flex-row items-center gap-2 mt-2'>
                  <MaterialIcons name='place' size={16} color='#6B7280' />
                  <Text className='text-sm' style={{ color: '#6B7280' }}>
                    {appointment.location}
                  </Text>
                </View>
              )}
            </View>
          ))
        )}

        <View className='h-24' />
      </ScrollView>
    </View>
  );
}
