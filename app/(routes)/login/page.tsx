'use client';

import AuthFooter from '@/_components/Auth/AuthFooter';
import AuthHeader from '@/_components/Auth/AuthHeader';
import InputField from '@/_components/Auth/InputField';
import Validator from '@/_lib/validator';
import { useCallback, useEffect, useState } from 'react';

interface ValuesType {
  email: string;
  password: string;
}

const DEFAULT_VALUES: ValuesType = {
  email: '',
  password: '',
};

interface ValidationType {
  email: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
}

const DEFAULT_VALIDATIONS: ValidationType = {
  email: { isValid: false, message: '' },
  password: { isValid: false, message: '' },
};

function validateSchema(name: string, values: ValuesType) {
  switch (name) {
    case 'email':
      const emailSchema = new Validator(values.email)
        .required('이메일을 입력해주세요')
        .isEmail('이메일 형식이 옳지 않습니다');
      const email = {
        isValid: emailSchema.validate(),
        message: emailSchema.validate() ? '' : emailSchema.getErrors()[0],
      };
      return email;
    case 'password':
      const passwordSchema = new Validator(values.password)
        .required('비밀번호를 입력해주세요')
        .minLength(8, '비밀번호를 8자 이상 입력해주세요');

      const password = {
        isValid: passwordSchema.validate(),
        message: passwordSchema.validate() ? '' : passwordSchema.getErrors()[0],
      };
      return password;
  }
}

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
