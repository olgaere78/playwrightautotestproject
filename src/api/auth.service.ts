import { ApiClient } from '../api/api-client';

export class AuthService {
  constructor(private apiClient: ApiClient) {}

  async login(email: string, password: string) {
    const response = await this.apiClient.post('/login', {
      body: {
        email,
        password: password,
      },
    });

    return await response.json();
  }
}
