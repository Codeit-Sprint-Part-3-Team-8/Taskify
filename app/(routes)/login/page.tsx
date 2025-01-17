'use client';

import AuthFooter from '@/_components/Auth/AuthFooter';
import AuthHeader from '@/_components/Auth/AuthHeader';
import InputField from '@/_components/Auth/InputField';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { ValuesType } from './loginType';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';
import { useAuth } from '@/context/AuthContext';
import Modal from '@/_components/Auth/Modal';
import Navigate from '@/_components/Auth/Navigate';
const DEFAULT_VALUES: ValuesType = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [validations, setValidations] = useState(DEFAULT_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, login, loading, errorMessage } = useAuth();

  const handleCloseModal = () => setShowModal(false);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValidations((prev) => ({
      ...prev,
      [name]: validateSchema(name, values),
    }));
  };

  const validateForm = useCallback(() => {
    const { email, password } = validations;
    const isValid = email.isValid && password.isValid;
    setIsFormValid(isValid);
  }, [validations]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    login(values);
  };

  useEffect(() => {
    if (errorMessage.login) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [errorMessage.login]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  if (loading.auth) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {user ? (
        <Navigate />
      ) : (
        <>
          {showModal && (
            <Modal
              text={errorMessage.login as string}
              onClick={handleCloseModal}
            />
          )}
          <div className="mx-auto w-full max-w-xs pb-8 pt-20 tablet:max-w-lg tablet:pt-52">
            <AuthHeader text="오늘도 만나서 반가워요!" />
            <form className="mb-6 flex flex-col gap-6" onSubmit={handleSubmit}>
              <InputField
                name="email"
                value={values.email}
                validation={validations.email}
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
              <button
                className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
                type="submit"
                disabled={!isFormValid || loading.login}
              >
                로그인
              </button>
            </form>
            <AuthFooter to="signup" />
          </div>
        </>
      )}
    </Suspense>
  );
}
