'use client';

import AuthFooter from '@/_components/Auth/AuthFooter';
import AuthHeader from '@/_components/Auth/AuthHeader';
import InputField from '@/_components/Auth/InputField';
import { useCallback, useEffect, useState } from 'react';
import { ValuesType } from './loginType';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';

const DEFAULT_VALUES: ValuesType = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [validations, setValidations] = useState(DEFAULT_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
        <AuthHeader text="오늘도 만나서 반가워요!" />
        <form className="mb-6 flex flex-col gap-6">
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
            disabled={!isFormValid}
          >
            로그인
          </button>
        </form>
        <AuthFooter to="signup" />
      </div>
    </>
  );
}
