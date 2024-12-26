'use client';

import useAsync from '@/_hooks/useAsync';
import { LoginUserParams } from '@/_types/auth.type';
import { UserType } from '@/_types/users.type';
import { loginUser } from '@/api/auth.api';
import { getUser } from '@/api/users.api';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect } from 'react';

interface AuthContextType {
  user: UserType | null;
  loadingLogin: boolean;
  loadingUpdate: boolean;
  login: ({ email, password }: LoginUserParams) => void;
  logout: () => void;
  loginErrorMessage: string | null;
  updateErrorMessage: string | null;
  update: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  loadingLogin: false,
  loadingUpdate: false,
  login: () => {},
  logout: () => {},
  loginErrorMessage: null,
  updateErrorMessage: null,
  update: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || null;
  const {
    excute: _getUser,
    data: userData,
    loading: loadingUpdate,
    errorMessage: updateErrorMessage,
    clear: clearUser,
  } = useAsync(getUser);
  const {
    excute: _loginUser,
    data: loginData,
    loading: loadingLogin,
    errorMessage: loginErrorMessage,
  } = useAsync(loginUser);

  async function login({ email, password }: LoginUserParams) {
    await _loginUser({ email, password });
  }

  function logout() {
    if (!key) return;
    localStorage.removeItem(key);
    clearUser();
  }

  const update = useCallback(() => {
    _getUser(undefined);
  }, [_getUser]);

  useEffect(() => {
    if (!key) return;
    if (loginData) {
      localStorage.setItem(key, loginData.accessToken);
    }
    if (localStorage.getItem(key)) {
      _getUser(undefined);
    }
  }, [_getUser, loginData, key]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        loadingUpdate,
        loadingLogin,
        login,
        logout,
        loginErrorMessage,
        updateErrorMessage,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(required = true) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error('must useAuth in AuthProvider');
  }

  useEffect(() => {
    console.log(location.href, context.user, context.loadingUpdate);
    if (required && !context.user && !context.loadingUpdate) {
      router.push('/login');
    }
  }, [required, context, router]);

  return context;
}

export { AuthProvider, useAuth };
