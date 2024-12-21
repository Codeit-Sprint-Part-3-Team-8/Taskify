import axios from './axios';

interface CreateUserParams {
  email: string;
  nickname: string;
  password: string;
}

async function createUser({ email, nickname, password }: CreateUserParams) {
  const response = await axios.post('/users', { email, nickname, password });
  return response.data;
}

interface UserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

async function getUser(): Promise<UserType> {
  const response = await axios.get('/users/me');
  return response.data;
}

export { createUser, getUser };
export type { UserType };
