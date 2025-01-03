'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import CheckboxField from './CheckboxField';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';
import { ValuesType } from './signupType';
import { createUser } from '@/api/users.api';
import useAsync from '@/_hooks/useAsync';
import { useRouter } from 'next/navigation';
import InputField from '@/_components/Auth/InputField';
import Modal from '@/_components/Auth/Modal';
import AuthHeader from '@/_components/Auth/AuthHeader';
import AuthFooter from '@/_components/Auth/AuthFooter';
import { useAuth } from '@/context/AuthContext';
import Navigate from '@/_components/Auth/Navigate';

const DEFAULT_VALUES: ValuesType = {
  email: '',
  nickname: '',
  password: '',
  repeat: '',
};

export default function SignUp() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [isChecked, setIsChecked] = useState(false);
  const [validations, setValidations] = useState(DEFAULT_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    data: userData,
    excute: createUserAsync,
    loading: loadingUser,
    error,
    errorMessage,
  } = useAsync(createUser);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleClickClose = () => setShowError(false);
  const handleClickSuccess = () => router.push('/login');

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValidations((prev) => ({ ...prev, ...validateSchema(name, values) }));
  };

  const handleChangeCheckbox = () => setIsChecked((prev) => !prev);

  const validateForm = useCallback(() => {
    const { email, nickname, password, repeat } = validations;
    const isValid =
      email.isValid &&
      nickname.isValid &&
      password.isValid &&
      repeat.isValid &&
      isChecked;
    setIsFormValid(isValid);
  }, [validations, isChecked]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    const body = {
      email: values.email.trim(),
      nickname: values.nickname.trim(),
      password: values.password.trim(),
    };
    await createUserAsync(body);
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  if (loading.auth) {
    return null;
  }

  return (
    <Suspense fallback={<div>loading</div>}>
      {user ? (
        <Navigate />
      ) : (
        <>
          {!!userData && (
            <Modal text="가입이 완료되었습니다!" onClick={handleClickSuccess} />
          )}
          {showError && (
            <Modal text={errorMessage as string} onClick={handleClickClose} />
          )}
          <div className="mx-auto w-full max-w-xs pb-8 pt-16 target:mt-40 tablet:max-w-lg">
            <AuthHeader text="첫 방문을 환영합니다!!" />
            <form className="mb-6 flex flex-col gap-6" onSubmit={handleSubmit}>
              <InputField
                name="email"
                value={values.email}
                validation={validations.email}
                onChange={handleChangeValue}
                onBlur={handleBlurInput}
              />
              <InputField
                name="nickname"
                value={values.nickname}
                validation={validations.nickname}
                onChange={handleChangeValue}
                onBlur={handleBlurInput}
              />
              <InputField
                name="password"
                type="password"
                value={values.password}
                validation={validations.password}
                onChange={handleChangeValue}
                onBlur={handleBlurInput}
              />
              <InputField
                name="repeat"
                type="password"
                value={values.repeat}
                validation={validations.repeat}
                onChange={handleChangeValue}
                onBlur={handleBlurInput}
              />
              <CheckboxField
                isChecked={isChecked}
                onChange={handleChangeCheckbox}
              />
              <button
                className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
                type="submit"
                disabled={!isFormValid || loadingUser}
              >
                가입하기
              </button>
            </form>
            <AuthFooter to="signin" />
          </div>
        </>
      )}
    </Suspense>
  );
}
