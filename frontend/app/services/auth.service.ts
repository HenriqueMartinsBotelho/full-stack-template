import HttpClient from '@/app/network/http-client';
import type { SingInResponse } from '@/app/common/response';

export const AuthService = {
  authenticate,
};

async function authenticate(
  email: string,
  password: string
): Promise<SingInResponse> {
  const httpClient = HttpClient();

  const response = await httpClient.post<SingInResponse>('/auth/v1/signin/', {
    credentials: {
      password,
      username: email,
    },
  });

  return response.data;
}
