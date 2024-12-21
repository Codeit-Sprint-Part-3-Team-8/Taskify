'use client';

import useAsync from '@/_hooks/useAsync';
import { LoginUserParams } from '@/_types/auth.type';
import { UserType } from '@/_types/user.type';
import { loginUser } from '@/api/auth.api';
import { getUser } from '@/api/users.api';
import { createContext, useContext, useEffect } from 'react';

/**
 * @todo 회원정보 수정 만들어야함
 */

const AuthContext = createContext<{
  user: UserType | null;
  loadingLogin: boolean;
  loadingUser: boolean;
  login: ({ email, password }: LoginUserParams) => void;
  logout: () => void;
  loginErrorMessage: string | null;
}>({
  user: null,
  loadingLogin: false,
  loadingUser: false,
  login: () => {},
  logout: () => {},
  loginErrorMessage: null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || null;
  const {
    excute: getUserAsync,
    data: userData,
    loading: loadingUser,
    clear: clearUser,
  } = useAsync(getUser);
  const {
    excute: loginUserAsync,
    data: loginData,
    loading: loadingLogin,
    errorMessage: loginErrorMessage,
  } = useAsync(loginUser);

  async function login({ email, password }: LoginUserParams) {
    await loginUserAsync({ email, password });
  }

  function logout() {
    if (!key) return;
    localStorage.removeItem(key);
    clearUser();
  }

  useEffect(() => {
    if (!key) return;
    if (loginData) {
      localStorage.setItem(key, loginData.accessToken);
    }
    if (localStorage.getItem(key)) {
      getUserAsync(undefined);
    }
  }, [getUserAsync, loginData, key]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        loadingUser,
        loadingLogin,
        login,
        logout,
        loginErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  // const router = useRouter();

  if (!context) {
    throw new Error('must useAuth in AuthProvider');
  }

  // useEffect(() => {
  //   if (required && !context.user && !context.loadingUser) {
  //     router.push('/login');
  //   }
  // }, [required, context.user, context.loadingUser, router]);

  return context;
}

export { AuthProvider, useAuth };
