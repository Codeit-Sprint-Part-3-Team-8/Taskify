'use client';

import { useCallback, useEffect, useState } from 'react';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import { DEFAULT_VALIDATIONS, validateSchema } from './validate';
import { ValuesType } from './signupType';

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
      email.isValid && nickname.isValid && password.isValid && repeat.isValid;
    setIsFormValid(isValid);
  }, [validations]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
      <AuthHeader />
      <form className="mb-6 flex flex-col gap-6">
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
        <CheckboxField isChecked={isChecked} onChange={handleChangeCheckbox} />
        <button
          className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
          type="submit"
          disabled={!isFormValid}
        >
          가입하기
        </button>
      </form>
      <AuthFooter to="signin" />
    </div>
  );
}
