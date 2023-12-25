export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async fetchData(endpoint?: string, options?: RequestInit): Promise<any> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint || ''}`, {
                method: 'GET',
                ...options,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}
