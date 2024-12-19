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

export { createUser };
