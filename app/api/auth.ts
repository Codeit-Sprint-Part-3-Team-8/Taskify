import axios from './axios';

interface LoginUserParams {
  email: string;
  password: string;
}

async function loginUser({ email, password }: LoginUserParams) {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
}

export { loginUser };
export type { LoginUserParams };
