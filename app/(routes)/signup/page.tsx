'use client';

import { useCallback, useEffect, useState } from 'react';
import CheckboxField from './CheckboxField';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';
import { ValuesType } from './signupType';
import { createUser } from '@/api/users';
import useAsync from '@/_hooks/useAsync';
import { useRouter } from 'next/navigation';
import InputField from '@/_components/Auth/InputField';
import Modal from '@/_components/Auth/Modal';
import AuthHeader from '@/_components/Auth/AuthHeader';
import AuthFooter from '@/_components/Auth/AuthFooter';

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
    loading,
    error,
    errorMessage,
  } = useAsync(createUser);
  const router = useRouter();

  const handleClickClose = () => setShowError(false);
  const handleClickSuccess = () => router.push('/login');

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      setValidations((prev) => ({ ...prev, ...validateSchema(name, next) }));
      return next;
    });
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

  return (
    <>
      {!!userData && (
        <Modal text="가입이 완료되었습니다!" onClick={handleClickSuccess} />
      )}
      {showError && (
        <Modal text={errorMessage as string} onClick={handleClickClose} />
      )}
      <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
        <AuthHeader text="첫 방문을 환영합니다!!" />
        <form className="mb-6 flex flex-col gap-6" onSubmit={handleSubmit}>
          <InputField
            name="email"
            value={values.email}
            validation={validations.email}
            onChange={handleChangeValue}
          />
          <InputField
            name="nickname"
            value={values.nickname}
            validation={validations.nickname}
            onChange={handleChangeValue}
          />
          <InputField
            name="password"
            value={values.password}
            validation={validations.password}
            onChange={handleChangeValue}
          />
          <InputField
            name="repeat"
            value={values.repeat}
            validation={validations.repeat}
            onChange={handleChangeValue}
          />
          <CheckboxField
            isChecked={isChecked}
            onChange={handleChangeCheckbox}
          />
          <button
            className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
            type="submit"
            disabled={!isFormValid || loading}
          >
            가입하기
          </button>
        </form>
        <AuthFooter to="signin" />
      </div>
    </>
  );
}
