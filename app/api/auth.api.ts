import { LoginUserParams, UpdatePasswordParams } from '@/_types/auth.type';
import axios from './axios';

async function loginUser({ email, password }: LoginUserParams) {
  const response = await axios.post('/auth/login', { email, password });
  return response.data;
}

async function updatePassword({ password, newPassword }: UpdatePasswordParams) {
  const response = await axios.put('/auth/password', {
    password,
    newPassword,
  });
  return response.data;
}

export { loginUser, updatePassword };
