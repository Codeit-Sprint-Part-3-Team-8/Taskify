import axios from './axios';

interface CreateUserParams {
  email: string;
  nickname: string;
  password: string;
}

const ACCESSTOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk1OCwidGVhbUlkIjoiMTEtOCIsImlhdCI6MTczNDMzMTY1OSwiaXNzIjoic3AtdGFza2lmeSJ9.NUwX8wxDLIx4GWjslfJYQ-jaxA0AsSLSZXcmK9r0sog';

async function createUser({ email, nickname, password }: CreateUserParams) {
  const response = await axios.post('/users', { email, nickname, password });
  return response.data;
}

async function getUser() {
  const response = await axios.get('/users/me', {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  });
  return response.data;
}

export { createUser, getUser };
