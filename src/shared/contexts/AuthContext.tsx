import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import type { User } from '../models/User';

interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState<User | null>({
        id: '1',
        name: 'Maria Silva',
        email: 'maria.silva@email.com',
        notificationsEnabled: true,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date(),
    });

    const login = useCallback(async (email: string, password: string) => {
        // Simulação de login fake
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email && password) {
            setIsAuthenticated(true);
            setUser({
                id: '1',
                name: 'Maria Silva',
                email,
                notificationsEnabled: true,
                createdAt: new Date('2025-01-01'),
                updatedAt: new Date(),
            });
        } else {
            throw new Error('Credenciais inválidas');
        }
    }, []);

    const updateProfile = useCallback(async (updates: Partial<User>) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        setUser(prev => prev ? {
            ...prev,
            ...updates,
            updatedAt: new Date(),
        } : null);
    }, []);

    const logout = useCallback(async () => {
        // Simulação de logout fake
        await new Promise(resolve => setTimeout(resolve, 500));

        Alert.alert(
            'Logout realizado',
            'Você foi desconectado com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setIsAuthenticated(false);
                        setUser(null);
                    },
                },
            ]
        );
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
