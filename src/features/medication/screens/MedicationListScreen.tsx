import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { DateSelector, DateItem } from '@/shared/components/molecules/DateSelector';
import { useMedications } from '../hooks/useMedications';
import { EditMedicationModal } from '../components/EditMedicationModal';
import { MedicationCard } from '../components/MedicationCard';
import { MedicationListSkeleton } from '../components/MedicationCardSkeleton';
import type { Medication } from '../model';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList, 'MedicationList'>;


export function MedicationListScreen() {
  console.log('[MEDICATION_LIST] Component rendering - START');

  const navigation = useNavigation<NavigationProp>();
  console.log('[MEDICATION_LIST] useNavigation SUCCESS, navigation exists:', !!navigation);

  const { medications, loading, error, isOfflineMode, deleteMedication, refresh } = useMedications();
  console.log('[MEDICATION_LIST] Medications count:', medications.length);
  console.log('[MEDICATION_LIST] Offline mode:', isOfflineMode);

  // State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleDateSelect = (_date: DateItem) => {
    // Handle date selection - filter medications by selected date
    // TODO: Implement medication filtering logic
  };

  const handleEdit = useCallback((medicationId: string) => {
    setSelectedMedicationId(medicationId);
    setEditModalVisible(true);
  }, []);

  const handleDelete = useCallback(async (id: string, name: string) => {
    Alert.alert('Excluir Medicamento', `Deseja realmente excluir "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMedication(id);
            Alert.alert('Sucesso', 'Medicamento excluído');
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir o medicamento');
          }
        },
      },
    ]);
  }, [deleteMedication]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  // Filtragem otimizada com useMemo
  const filteredMedications = useMemo(() => {
    if (!searchQuery.trim()) {
      return medications;
    }

    const query = searchQuery.toLowerCase();
    return medications.filter(
      (med) =>
        med.name.toLowerCase().includes(query) ||
        med.dosage.toLowerCase().includes(query) ||
        (med.notes && med.notes.toLowerCase().includes(query))
    );
  }, [medications, searchQuery]);

  // Render item otimizado com useCallback
  const renderItem: ListRenderItem<Medication> = useCallback(
    ({ item }) => (
      <MedicationCard
        medication={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ),
    [handleEdit, handleDelete]
  );

  // Key extractor otimizado
  const keyExtractor = useCallback((item: Medication) => item.id, []);

  // Empty component
  const renderEmptyComponent = useCallback(
    () => (
      <View className='items-center py-12'>
        <MaterialIcons name='medication' size={64} color='#D1D5DB' />
        <Text className='mt-4 text-gray-500 text-center'>
          {searchQuery ? 'Nenhum medicamento encontrado' : 'Nenhum medicamento cadastrado'}
        </Text>
        {!searchQuery && (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMedication')}
            className='mt-4 bg-primary px-6 py-3 rounded-full'
          >
            <Text className='text-white font-semibold'>Adicionar Primeiro Medicamento</Text>
          </TouchableOpacity>
        )}
      </View>
    ),
    [searchQuery, navigation]
  );

  // Header component (fixo, sem dependência de searchQuery)
  const ListHeaderComponent = useCallback(
    () => (
      <View className='px-6 pb-3'>
        {/* Count */}
        <Text className='text-sm text-gray-600 mb-3'>
          {filteredMedications.length === medications.length
            ? `${medications.length} medicamentos`
            : `${filteredMedications.length} de ${medications.length} medicamentos`}
        </Text>
      </View>
    ),
    [filteredMedications.length, medications.length]
  );

  if (loading && medications.length === 0) {
    return (
      <View className='flex-1 bg-gray-50'>
        {/* Header */}
        <View className='bg-white pt-12 pb-6 px-6 rounded-b-3xl'>
          <View className='flex-row justify-between items-start mb-6'>
            <View>
              <Text className='text-gray-500 text-sm'>Find Your Best</Text>
              <Text className='text-2xl font-bold text-gray-900'>Kamrul Hasan</Text>
            </View>
            <TouchableOpacity className='bg-white p-3 rounded-full shadow-sm'>
              <MaterialIcons name='notifications-none' size={24} color='#666' />
            </TouchableOpacity>
          </View>
          <DateSelector onDateSelect={handleDateSelect} daysToShow={7} />
        </View>

        {/* Skeleton Loading */}
        <View className='px-6 pt-6'>
          <MedicationListSkeleton count={8} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className='flex-1 bg-gray-50 items-center justify-center px-6'>
        <MaterialIcons name='error-outline' size={64} color='#EF4444' />
        <Text className='mt-4 text-lg font-bold text-gray-900'>Erro ao carregar</Text>
        <Text className='mt-2 text-gray-600 text-center'>{error.message}</Text>
        <TouchableOpacity
          onPress={refresh}
          className='mt-6 bg-primary px-6 py-3 rounded-full'
        >
          <Text className='text-white font-semibold'>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Offline Mode Banner */}
      {isOfflineMode && (
        <View className='bg-amber-500 px-4 py-2 flex-row items-center justify-center'>
          <MaterialIcons name='cloud-off' size={20} color='white' />
          <Text className='text-white font-semibold ml-2'>
            Modo Offline - Dados de Exemplo
          </Text>
        </View>
      )}

      {/* Header */}
      <View className='bg-white pt-12 pb-6 px-6 rounded-b-3xl'>
        <View className='flex-row justify-between items-start mb-6'>
          <View>
            <Text className='text-gray-500 text-sm'>Find Your Best</Text>
            <Text className='text-2xl font-bold text-gray-900'>Kamrul Hasan</Text>
          </View>
          <TouchableOpacity className='bg-white p-3 rounded-full shadow-sm'>
            <MaterialIcons name='notifications-none' size={24} color='#666' />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <DateSelector onDateSelect={handleDateSelect} daysToShow={7} />
      </View>

      {/* Fixed Section Header */}
      <View className='bg-gray-50 px-6 pt-6 pb-3'>
        <View className='flex-row justify-between items-center mb-4'>
          <Text className='text-lg font-bold text-gray-900'>
            Meus Medicamentos
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddMedication')}
            className='bg-primary px-4 py-2 rounded-full'
          >
            <Text className='text-sm text-white font-semibold'>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar - Fora do FlatList para evitar unmount */}
        <View className='bg-white rounded-2xl px-4 py-3 flex-row items-center shadow-sm'>
          <MaterialIcons name='search' size={20} color='#9CA3AF' />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder='Buscar medicamento...'
            placeholderTextColor='#9CA3AF'
            className='flex-1 ml-2 text-gray-900'
            autoCapitalize='none'
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name='close' size={20} color='#9CA3AF' />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FlatList Otimizado */}
      <FlatList
        data={filteredMedications}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#7B5FFF']}
            tintColor='#7B5FFF'
          />
        }
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        // Otimizações de performance
        removeClippedSubviews={true} // Remove views fora da tela (Android)
        maxToRenderPerBatch={10} // Renderiza 10 itens por batch
        updateCellsBatchingPeriod={50} // Atualiza a cada 50ms
        initialNumToRender={15} // Renderiza 15 itens inicialmente
        windowSize={10} // Mantém 10 telas de altura em memória
        getItemLayout={(_, index) => ({
          length: 96, // Altura aproximada do card (ajustar conforme necessário)
          offset: 96 * index,
          index,
        })}
      />

      {/* Bottom Navigation */}
      <View className='bg-white px-8 py-4 flex-row justify-around items-center rounded-t-3xl shadow-lg'>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='home' size={28} color='#1a1a1a' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='insert-chart' size={28} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity
          className='bg-primary w-14 h-14 rounded-full items-center justify-center -mt-8 shadow-lg'
          onPress={() => navigation.navigate('AddMedication')}
        >
          <MaterialIcons name='add' size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='settings' size={28} color='#ccc' />
        </TouchableOpacity>
        <TouchableOpacity className='items-center'>
          <MaterialIcons name='person-outline' size={28} color='#ccc' />
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <EditMedicationModal
        visible={editModalVisible}
        medicationId={selectedMedicationId}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedMedicationId(null);
        }}
      />
    </View>
  );
}
