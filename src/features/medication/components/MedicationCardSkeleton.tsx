import React from 'react';
import { View, Text } from 'react-native';

/**
 * Skeleton loader para cards de medicamento
 * Mostra placeholder animado enquanto carrega dados
 */
export function MedicationCardSkeleton() {
    return (
        <View className='bg-white rounded-3xl p-4 flex-row items-center shadow-sm mb-3'>
            {/* Icon skeleton */}
            <View className='w-14 h-14 rounded-2xl mr-4 bg-gray-200 animate-pulse' />

            {/* Content skeleton */}
            <View className='flex-1'>
                <View className='h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse' />
                <View className='h-4 bg-gray-200 rounded w-1/2 mb-1 animate-pulse' />
                <View className='h-3 bg-gray-200 rounded w-2/3 animate-pulse' />
            </View>

            {/* Actions skeleton */}
            <View className='flex-row gap-1'>
                <View className='w-10 h-10 bg-gray-200 rounded animate-pulse' />
                <View className='w-10 h-10 bg-gray-200 rounded animate-pulse' />
            </View>
        </View>
    );
}

/**
 * Lista de skeletons
 */
export function MedicationListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <MedicationCardSkeleton key={`skeleton-${index}`} />
            ))}
        </>
    );
}
