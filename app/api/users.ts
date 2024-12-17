import axios from './axios';

interface CreateUserParams {
  email: string;
  nickname: string;
  password: string;
}

async function createUser({ email, nickname, password }: CreateUserParams) {
  const result = await axios.post('/users', { email, nickname, password });
  console.log(result);
  return result.data;
}

export { createUser };
