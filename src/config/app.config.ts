/**
 * Configurações da aplicação
 * Centralize flags, URLs e configurações aqui
 */

export const AppConfig = {
    // Feature Flags
    features: {
        useMockData: false, // Usando API Node-RED
        useLocalStorage: false,
        useApi: true, // API ativada
    },

    // API Configuration
    api: {
        // URLs para tentar (em ordem de prioridade)
        // localhost = Recomendado! Use com `adb reverse tcp:1880 tcp:1880`
        // 10.0.2.2 = Android Emulator sem reverse
        baseUrls: [
            process.env.EXPO_PUBLIC_API_URL,
            'http://localhost:1880/api',     // Recomendado (use adb reverse)
            'http://10.0.2.2:1880/api',     // Fallback Android Emulator
            'http://10.255.255.254:1880/api' // IP local (ajuste conforme necessário)
        ].filter(Boolean) as string[],
        baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:1880/api',
        timeout: 5000,
    },

    // Storage Keys
    storage: {
        medications: '@timesaude:medications',
        reminders: '@timesaude:reminders',
        user: '@timesaude:user',
    },
} as const;
