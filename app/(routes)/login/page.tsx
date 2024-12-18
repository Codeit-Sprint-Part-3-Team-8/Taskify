'use client';

import AuthFooter from '@/_components/Auth/AuthFooter';
import AuthHeader from '@/_components/Auth/AuthHeader';
import InputField from '@/_components/Auth/InputField';
import { useCallback, useEffect, useState } from 'react';
import { ValuesType } from './loginType';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';
import useAsync from '@/_hooks/useAsync';
import { loginUser } from '@/api/auth';
import Modal from '@/_components/Auth/Modal';

const DEFAULT_VALUES: ValuesType = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [validations, setValidations] = useState(DEFAULT_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const {
    data: loginData,
    excute: loginUserAsync,
    loading,
    error,
    errorMessage,
  } = useAsync(loginUser);

  const handleClickClose = () => setShowError(false);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      setValidations((prev) => ({
        ...prev,
        [name]: validateSchema(name, next),
      }));
      return next;
    });
  };

  const validateForm = useCallback(() => {
    const { email, password } = validations;
    const isValid = email.isValid && password.isValid;
    setIsFormValid(isValid);
  }, [validations]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    await loginUserAsync(values);
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

  return (
    <>
      {!!loginData && (
        <Modal text="로그인이 완료되었습니다!" onClick={handleClickClose} />
      )}
      {showError && (
        <Modal text={errorMessage as string} onClick={handleClickClose} />
      )}
      <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
        <AuthHeader text="오늘도 만나서 반가워요!" />
        <form className="mb-6 flex flex-col gap-6" onSubmit={handleSubmit}>
          <InputField
            name="email"
            value={values.email}
            validation={validations.email}
            onChange={handleChangeValue}
          />
          <InputField
            name="password"
            value={values.password}
            validation={validations.password}
            onChange={handleChangeValue}
          />
          <button
            className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
            type="submit"
            disabled={!isFormValid || loading}
          >
            로그인
          </button>
        </form>
        <AuthFooter to="signup" />
      </div>
    </>
  );
}
