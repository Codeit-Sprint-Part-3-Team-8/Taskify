'use client';

import { useState } from 'react';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';
import Validator from '@/_lib/validator';

interface ValuesType {
  email: string;
  nickname: string;
  password: string;
  repeat: string;
}

const DEFAULT_VALUES: ValuesType = {
  email: '',
  nickname: '',
  password: '',
  repeat: '',
};

interface ValidationType {
  email: { isValid: boolean; message: string };
  nickname: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
  repeat: { isValid: boolean; message: string };
}

const DEFAULT_VALIDATIONS: ValidationType = {
  email: { isValid: false, message: '' },
  nickname: { isValid: false, message: '' },
  password: { isValid: false, message: '' },
  repeat: { isValid: false, message: '' },
};

function validateSchema(values: ValuesType): ValidationType {
  const emailSchema = new Validator(values.email).required().isEmail();
  const nicknameSchema = new Validator(values.nickname).required().minLength(2);
  const passwordSchema = new Validator(values.password).required().minLength(8);

  const email = {
    isValid: emailSchema.validate(),
    message: emailSchema.validate() ? '' : emailSchema.getErrors()[0],
  };
  const nickname = {
    isValid: nicknameSchema.validate(),
    message: nicknameSchema.validate() ? '' : nicknameSchema.getErrors()[0],
  };
  const password = {
    isValid: passwordSchema.validate(),
    message: passwordSchema.validate() ? '' : passwordSchema.getErrors()[0],
  };

  const repeat = { isValid: false, message: '' };
  if (values.repeat.trim().length > 0) {
    if (values.repeat.trim() === values.password.trim()) {
      repeat.isValid = true;
    } else {
      repeat.message = '비밀번호가 일치하지 않습니다.';
    }
  }

  return {
    email,
    nickname,
    password,
    repeat,
  };
}

export default function SignUp() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [isChecked, setIsChecked] = useState(false);
  const [validations, setValidations] = useState(DEFAULT_VALIDATIONS);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      setValidations(validateSchema(next));
      return next;
    });
  };

  const handleChangeCheckbox = () => setIsChecked((prev) => !prev);

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
          disabled
        >
          가입하기
        </button>
      </form>
      <AuthFooter to="signin" />
    </div>
  );
}
