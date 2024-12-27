interface LoginUserParams {
  email: string;
  password: string;
}

interface UpdatePasswordParams {
  password: string;
  newPassword: string;
}

export type { LoginUserParams, UpdatePasswordParams };
