import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { medicationCache } from '../cache';

/**
 * Componente de debug para visualizar e gerenciar cache
 * (Remover em produção ou colocar em settings)
 */
export function CacheDebugger() {
    const [stats, setStats] = useState<{ memorySize: number; memoryKeys: string[]; timestamp: number }>({
        memorySize: 0,
        memoryKeys: [],
        timestamp: 0
    });

    const updateStats = () => {
        const newStats = medicationCache.getStats();
        setStats(newStats);
    };

    const handleClearCache = async () => {
        await medicationCache.clear();
        updateStats();
    };

    useEffect(() => {
        updateStats();
        const interval = setInterval(updateStats, 2000); // Atualiza a cada 2s
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🗄️ Cache Debug</Text>
            <Text style={styles.info}>Memory: {stats.memorySize} entries</Text>
            <Text style={styles.info}>Keys: {stats.memoryKeys.join(', ') || 'none'}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleClearCache}
            >
                <Text style={styles.buttonText}>Clear Cache</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        margin: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#ff6b6b',
        padding: 8,
        borderRadius: 6,
        marginTop: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});
