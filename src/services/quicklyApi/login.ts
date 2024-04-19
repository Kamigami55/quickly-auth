import { QUICKLY_API_URL } from '@/constants/apiUrl';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export async function login({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(QUICKLY_API_URL.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJson = (await response.json()) as LoginResponse;
  return responseJson;
}
