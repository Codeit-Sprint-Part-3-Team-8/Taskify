'use client';

import useAsync from '@/_hooks/useAsync';
import { LoginUserParams } from '@/_types/auth.type';
import { UserType } from '@/_types/users.type';
import { loginUser } from '@/api/auth.api';
import { getUser } from '@/api/users.api';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: UserType | null;
  loading: {
    auth: boolean;
    login: boolean;
    update: boolean;
  };
  errorMessage: {
    login: string | null;
    update: string | null;
  };
  login: ({ email, password }: LoginUserParams) => void;
  logout: () => void;
  update: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
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

  const login = useCallback(
    async ({ email, password }: LoginUserParams) => {
      await _loginUser({ email, password });
    },
    [_loginUser],
  );

  const logout = useCallback(() => {
    if (!key) return;
    localStorage.removeItem(key);
    setAccessToken(null);
    clearUser();
  }, [key, clearUser]);

  const update = useCallback(() => {
    _getUser(undefined);
  }, [_getUser]);

  useEffect(() => {
    if (!key) {
      setAccessToken(null);
      throw new Error(`Can't load Key`);
    }
    setAccessToken(localStorage.getItem(key) || null);
  }, [key]);

  useEffect(() => {
    if (key && loginData) {
      const next = loginData.accessToken || null;
      setAccessToken(next);
      localStorage.setItem(key, next);
    }
  }, [key, loginData]);

  useEffect(() => {
    if (accessToken) {
      _getUser(undefined);
    } else {
      setLoadingAuth(false);
    }
  }, [_getUser, accessToken]);

  useEffect(() => {
    if (userData || updateErrorMessage) {
      setLoadingAuth(false);
    }
  }, [userData, updateErrorMessage]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        loading: {
          auth: loadingAuth,
          login: loadingLogin,
          update: loadingUpdate,
        },
        errorMessage: {
          login: loginErrorMessage,
          update: updateErrorMessage,
        },
        login,
        logout,
        update,
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
    if (
      required &&
      !context.user &&
      !context.loading.auth &&
      !context.loading.login
    ) {
      router.push(`/login?goto=${location.pathname}`);
    }
  }, [
    required,
    context.user,
    context.loading.auth,
    context.loading.login,
    router,
  ]);

  return context;
}

export { AuthProvider, useAuth };
