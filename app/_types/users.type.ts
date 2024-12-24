interface CreateUserParams {
  email: string;
  nickname: string;
  password: string;
}

interface UserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface UpdateUserParams {
  nickname: string;
  profileImageUrl: string | null;
}

interface CreateProfileImageParams {
  image: FormData;
}

interface ProfileImageType {
  profileImageUrl: string;
}

export type {
  UserType,
  ProfileImageType,
  CreateUserParams,
  UpdateUserParams,
  CreateProfileImageParams,
};
