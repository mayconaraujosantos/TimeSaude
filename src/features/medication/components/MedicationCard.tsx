import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { Medication } from '../model';

interface MedicationCardProps {
  medication: Medication;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
}

/**
 * Card de medicamento otimizado com React.memo
 * Previne re-renders desnecessários em listas grandes
 */
export const MedicationCard = memo<MedicationCardProps>(
  ({ medication, onEdit, onDelete }) => {
    return (
      <View className='bg-white rounded-3xl p-4 flex-row items-center shadow-sm mb-3'>
        <View className='w-14 h-14 rounded-2xl items-center justify-center mr-4 bg-purple-100'>
          <Text className='text-3xl'>💊</Text>
        </View>

        <View className='flex-1'>
          <Text className='text-base font-bold text-gray-900 mb-1'>{medication.name}</Text>
          <Text className='text-xs text-gray-500 mb-1'>
            {medication.dosage} • {medication.frequency}
          </Text>
          {medication.notes && (
            <Text className='text-xs text-gray-400' numberOfLines={1}>
              {medication.notes}
            </Text>
          )}
        </View>

        <View className='flex-row gap-1'>
          <TouchableOpacity
            onPress={() => onEdit(medication.id)}
            className='w-10 h-10 items-center justify-center'
          >
            <MaterialIcons name='edit' size={20} color='#7B5FFF' />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(medication.id, medication.name)}
            className='w-10 h-10 items-center justify-center'
          >
            <MaterialIcons name='delete' size={20} color='#EF4444' />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  // Custom comparison function - só re-renderiza se ID ou nome mudar
  (prevProps, nextProps) => {
    return (
      prevProps.medication.id === nextProps.medication.id &&
      prevProps.medication.name === nextProps.medication.name &&
      prevProps.medication.dosage === nextProps.medication.dosage &&
      prevProps.medication.frequency === nextProps.medication.frequency &&
      prevProps.medication.notes === nextProps.medication.notes
    );
  }
);

MedicationCard.displayName = 'MedicationCard';
