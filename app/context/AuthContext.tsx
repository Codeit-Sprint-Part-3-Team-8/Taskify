'use client';

import useAsync from '@/_hooks/useAsync';
import { loginUser, LoginUserParams } from '@/api/auth';
import { getUser, UserType } from '@/api/users';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';

/**
 * @todo 회원정보 수정 만들어야함
 */

const AuthContext = createContext<{
  user: UserType | null;
  loading: boolean;
  login: ({ email, password }: LoginUserParams) => void;
  logout: () => void;
}>({
  user: null,
  loading: false,
  login: () => {},
  logout: () => {},
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
  }, [loginData, key]);

  useEffect(() => {
    getUserAsync(undefined);
  }, [getUserAsync]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        loading: loadingUser || loadingLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(required: boolean = false) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('must useAuth in AuthProvider');
  }

  useEffect(() => {
    if (required && !context.user && !context.loading) {
      router.push('/login');
    }
  }, [required, context.user, context.loading, router]);

  return context;
}

export { AuthProvider, useAuth };
