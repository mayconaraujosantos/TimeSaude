/**
 * Helper para verificar conectividade com a API
 * Útil para diagnóstico de problemas de rede
 */

export class ApiHealthCheck {
    /**
     * Testa conectividade com uma URL específica
     */
    static async testConnection(url: string, timeoutMs: number = 3000): Promise<{
        success: boolean;
        status?: number;
        message: string;
        responseTime?: number;
    }> {
        const startTime = Date.now();

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            const response = await fetch(url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                },
            });

            clearTimeout(timeoutId);
            const responseTime = Date.now() - startTime;

            return {
                success: response.ok,
                status: response.status,
                message: response.ok
                    ? `Conectado com sucesso (${responseTime}ms)`
                    : `Erro HTTP ${response.status}`,
                responseTime,
            };
        } catch (error: any) {
            const responseTime = Date.now() - startTime;

            if (error.name === 'AbortError') {
                return {
                    success: false,
                    message: `Timeout após ${timeoutMs}ms`,
                    responseTime,
                };
            }

            return {
                success: false,
                message: error.message || 'Erro desconhecido',
                responseTime,
            };
        }
    }

    /**
     * Testa múltiplas URLs e retorna a primeira que funcionar
     */
    static async findWorkingUrl(urls: string[], endpoint: string = ''): Promise<{
        workingUrl: string | null;
        results: Array<{
            url: string;
            success: boolean;
            message: string;
            responseTime?: number;
        }>;
    }> {
        console.log('[HealthCheck] Testing', urls.length, 'URLs...');

        const results = [];
        let workingUrl: string | null = null;

        for (const baseUrl of urls) {
            const testUrl = `${baseUrl}${endpoint}`;
            console.log('[HealthCheck] Testing:', testUrl);

            const result = await this.testConnection(testUrl);
            results.push({
                url: baseUrl,
                ...result,
            });

            if (result.success && !workingUrl) {
                workingUrl = baseUrl;
                console.log('[HealthCheck] ✓ Found working URL:', baseUrl);
                break; // Encontrou uma URL que funciona, pode parar
            } else {
                console.log('[HealthCheck] ✗ Failed:', baseUrl, result.message);
            }
        }

        return { workingUrl, results };
    }
}
