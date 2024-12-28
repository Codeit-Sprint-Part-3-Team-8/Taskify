import {
  CreateProfileImageParams,
  CreateUserParams,
  ProfileImageType,
  UpdateUserParams,
  UserType,
} from '@/_types/users.type';
import axios from './axios';

async function createUser({
  email,
  nickname,
  password,
}: CreateUserParams): Promise<UserType> {
  const response = await axios.post('/users', { email, nickname, password });
  return response.data;
}

async function getUser(): Promise<UserType> {
  const response = await axios.get('/users/me');
  return response.data;
}

async function updateUser({
  nickname,
  profileImageUrl,
}: UpdateUserParams): Promise<UserType> {
  const response = await axios.put('/users/me', {
    nickname,
    profileImageUrl,
  });
  return response.data;
}

async function createProfileImage({
  image,
}: CreateProfileImageParams): Promise<ProfileImageType> {
  const response = await axios.post('users/me/image', image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export { createUser, getUser, updateUser, createProfileImage };
