import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MedicationStackParamList } from '@/navigation_stack/navigation/MedicationNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

type NavigationProp = NativeStackNavigationProp<MedicationStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Mock user data - convertido para state para permitir edição
  const [user, setUser] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '+55 11 98765-4321',
    birthDate: '15/03/1985',
    bloodType: 'O+',
    emergencyContact: {
      name: 'João Silva',
      phone: '+55 11 91234-5678',
      relationship: 'Cônjuge',
    },
  });

  // State temporário para o formulário de edição
  const [editForm, setEditForm] = useState(user);

  const handleSaveEdit = () => {
    setUser(editForm);
    setEditModalVisible(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const handleCancelEdit = () => {
    setEditForm(user);
    setEditModalVisible(false);
  };

  return (
    <View className='flex-1' style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <LinearGradient
        colors={['#7B5FFF', '#9B7FFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className='px-6 pt-16 pb-8'
      >
        <View className='flex-row items-center justify-between mb-6'>
          <TouchableOpacity
            className='w-10 h-10 items-center justify-center rounded-full'
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='arrow-back' size={24} color='#FFFFFF' />
          </TouchableOpacity>
          <Text className='text-2xl font-bold' style={{ color: '#FFFFFF' }}>
            Meu Perfil
          </Text>
          <TouchableOpacity
            className='w-10 h-10 items-center justify-center rounded-full'
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            onPress={() => {
              setEditForm(user);
              setEditModalVisible(true);
            }}
          >
            <MaterialIcons name='edit' size={20} color='#FFFFFF' />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View className='items-center'>
          <View
            className='w-24 h-24 rounded-full items-center justify-center mb-3'
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <MaterialIcons name='person' size={48} color='#7B5FFF' />
          </View>
          <Text className='text-xl font-bold mb-1' style={{ color: '#FFFFFF' }}>
            {user.name}
          </Text>
          <Text className='text-sm' style={{ color: 'rgba(255,255,255,0.8)' }}>
            {user.email}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className='flex-1 px-6' style={{ marginTop: -20 }}>
        {/* Personal Info */}
        <View className='mb-6'>
          <View
            className='rounded-3xl p-4'
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#7B5FFF',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Text className='text-lg font-bold mb-4 px-2' style={{ color: '#1A1A1A' }}>
              Informações Pessoais
            </Text>

            <View className='py-3 px-2 border-b' style={{ borderColor: '#E5E7EB' }}>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='email' size={20} color='#7B5FFF' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  E-mail
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.email}
              </Text>
            </View>

            <View className='py-3 px-2 border-b' style={{ borderColor: '#E5E7EB' }}>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='phone' size={20} color='#7B5FFF' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Telefone
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.phone}
              </Text>
            </View>

            <View className='py-3 px-2 border-b' style={{ borderColor: '#E5E7EB' }}>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='cake' size={20} color='#7B5FFF' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Data de Nascimento
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.birthDate}
              </Text>
            </View>

            <View className='py-3 px-2'>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='local-hospital' size={20} color='#7B5FFF' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Tipo Sanguíneo
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.bloodType}
              </Text>
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View className='mb-6'>
          <View
            className='rounded-3xl p-4'
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#EF4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <View className='flex-row items-center gap-2 mb-4 px-2'>
              <MaterialIcons name='emergency' size={24} color='#EF4444' />
              <Text className='text-lg font-bold' style={{ color: '#1A1A1A' }}>
                Contato de Emergência
              </Text>
            </View>

            <View className='py-3 px-2 border-b' style={{ borderColor: '#E5E7EB' }}>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='person-outline' size={20} color='#EF4444' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Nome
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.emergencyContact.name}
              </Text>
            </View>

            <View className='py-3 px-2 border-b' style={{ borderColor: '#E5E7EB' }}>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='phone' size={20} color='#EF4444' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Telefone
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.emergencyContact.phone}
              </Text>
            </View>

            <View className='py-3 px-2'>
              <View className='flex-row items-center gap-3 mb-1'>
                <MaterialIcons name='family-restroom' size={20} color='#EF4444' />
                <Text className='text-xs' style={{ color: '#6B7280' }}>
                  Relacionamento
                </Text>
              </View>
              <Text className='text-base ml-8' style={{ color: '#1A1A1A' }}>
                {user.emergencyContact.relationship}
              </Text>
            </View>
          </View>
        </View>

        {/* Health Stats */}
        <View className='mb-6'>
          <Text className='text-lg font-bold mb-3' style={{ color: '#1A1A1A' }}>
            Estatísticas de Saúde
          </Text>

          <View className='flex-row gap-3 mb-8'>
            <View className='flex-1 rounded-3xl p-4' style={{ backgroundColor: '#E8E1FF' }}>
              <MaterialIcons name='medication' size={24} color='#7B5FFF' />
              <Text className='text-2xl font-bold mt-2' style={{ color: '#1A1A1A' }}>
                12
              </Text>
              <Text className='text-xs' style={{ color: '#6B7280' }}>
                Medicamentos
              </Text>
            </View>

            <View className='flex-1 rounded-3xl p-4' style={{ backgroundColor: '#D4E7FF' }}>
              <MaterialIcons name='event' size={24} color='#3B82F6' />
              <Text className='text-2xl font-bold mt-2' style={{ color: '#1A1A1A' }}>
                5
              </Text>
              <Text className='text-xs' style={{ color: '#6B7280' }}>
                Consultas
              </Text>
            </View>

            <View className='flex-1 rounded-3xl p-4' style={{ backgroundColor: '#FFE1EE' }}>
              <MaterialIcons name='check-circle' size={24} color='#10B981' />
              <Text className='text-2xl font-bold mt-2' style={{ color: '#1A1A1A' }}>
                95%
              </Text>
              <Text className='text-xs' style={{ color: '#6B7280' }}>
                Adesão
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType='slide'
        onRequestClose={handleCancelEdit}
      >
        <View className='flex-1 bg-black/50 justify-end'>
          <View
            className='rounded-t-[32px] p-6'
            style={{
              backgroundColor: '#FFFFFF',
              maxHeight: '85%',
            }}
          >
            <View className='flex-row justify-between items-center mb-6'>
              <Text className='text-2xl font-bold' style={{ color: '#1A1A1A' }}>
                Editar Perfil
              </Text>
              <TouchableOpacity onPress={handleCancelEdit}>
                <MaterialIcons name='close' size={24} color='#6B7280' />
              </TouchableOpacity>
            </View>

            <ScrollView className='mb-4' showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Nome
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.name}
                  onChangeText={text => setEditForm({ ...editForm, name: text })}
                />
              </View>

              {/* Email */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Email
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.email}
                  onChangeText={text => setEditForm({ ...editForm, email: text })}
                  keyboardType='email-address'
                />
              </View>

              {/* Telefone */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Telefone
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.phone}
                  onChangeText={text => setEditForm({ ...editForm, phone: text })}
                  keyboardType='phone-pad'
                />
              </View>

              {/* Data de Nascimento */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Data de Nascimento
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.birthDate}
                  onChangeText={text => setEditForm({ ...editForm, birthDate: text })}
                />
              </View>

              {/* Tipo Sanguíneo */}
              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Tipo Sanguíneo
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.bloodType}
                  onChangeText={text => setEditForm({ ...editForm, bloodType: text })}
                />
              </View>

              {/* Contato de Emergência */}
              <Text className='text-lg font-bold mt-4 mb-3' style={{ color: '#1A1A1A' }}>
                Contato de Emergência
              </Text>

              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Nome
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.emergencyContact.name}
                  onChangeText={text =>
                    setEditForm({
                      ...editForm,
                      emergencyContact: { ...editForm.emergencyContact, name: text },
                    })
                  }
                />
              </View>

              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Telefone
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.emergencyContact.phone}
                  onChangeText={text =>
                    setEditForm({
                      ...editForm,
                      emergencyContact: { ...editForm.emergencyContact, phone: text },
                    })
                  }
                  keyboardType='phone-pad'
                />
              </View>

              <View className='mb-4'>
                <Text className='text-sm font-medium mb-2' style={{ color: '#1A1A1A' }}>
                  Relacionamento
                </Text>
                <TextInput
                  className='rounded-2xl px-4 py-3'
                  style={{
                    backgroundColor: '#F3F4F6',
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    color: '#1A1A1A',
                  }}
                  value={editForm.emergencyContact.relationship}
                  onChangeText={text =>
                    setEditForm({
                      ...editForm,
                      emergencyContact: { ...editForm.emergencyContact, relationship: text },
                    })
                  }
                />
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className='flex-row gap-3'>
              <TouchableOpacity
                className='flex-1 rounded-full py-4'
                style={{ backgroundColor: '#F3F4F6' }}
                onPress={handleCancelEdit}
              >
                <Text className='text-center text-base font-bold' style={{ color: '#6B7280' }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='flex-1 rounded-full py-4'
                style={{ backgroundColor: '#7B5FFF' }}
                onPress={handleSaveEdit}
              >
                <Text className='text-center text-base font-bold' style={{ color: '#FFFFFF' }}>
                  Salvar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
