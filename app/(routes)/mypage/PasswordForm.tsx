import InputField from '@/_components/Auth/InputField';
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from 'react';
import {
  confirmPassword,
  DEFAULT_PASSWORD_VALIDATIONS,
  validate,
} from './validate';
import useAsync from '@/_hooks/useAsync';
import { updatePassword } from '@/api/auth.api';

const DEFAUTL_VALUES = {
  current: '',
  changed: '',
  confirmed: '',
};

export default function PasswordForm({ update }: { update: () => void }) {
  const [values, setValues] = useState(DEFAUTL_VALUES);
  const [validations, setValidations] = useState(DEFAULT_PASSWORD_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);
  const { data: updateData, excute: _updatePassword } =
    useAsync(updatePassword);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlurInput = (event: FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setValidations((prev) => {
      if (name === 'current') {
        return {
          ...prev,
          current: validate.password(values.current),
        };
      }
      if (name === 'changed' || name === 'confirmed') {
        return {
          ...prev,
          changed: validate.password(values.changed),
          confirmed: confirmPassword({
            changed: values.changed,
            confirmed: values.confirmed,
            message: '비밀번호가 일치하지 않습니다.',
          }),
        };
      }
      return prev;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    _updatePassword({ password: values.current, newPassword: values.changed });
  };

  useEffect(() => {
    setIsFormValid(
      validations.current.isValid &&
        validations.changed.isValid &&
        validations.confirmed.isValid,
    );
  }, [validations]);

  useEffect(() => {
    update();
  }, [updateData, update]);

  return (
    <form
      className="min-w-[18rem] rounded-lg bg-white p-4 tablet:w-[42rem] tablet:rounded-2xl tablet:p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 text-2lg font-bold text-black-333236 tablet:mb-6 tablet:text-2xl">
        비밀번호 변경
      </h2>
      <div className="flex flex-col gap-4">
        <InputField
          name="current"
          value={values.current}
          onChange={handleChangeValue}
          validation={validations.current}
          label="현재 비밀번호"
          placeholder="비밀번호 입력"
          onBlur={handleBlurInput}
        />
        <InputField
          name="changed"
          value={values.changed}
          onChange={handleChangeValue}
          validation={validations.changed}
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
          onBlur={handleBlurInput}
        />
        <InputField
          name="confirmed"
          value={values.confirmed}
          onChange={handleChangeValue}
          validation={validations.confirmed}
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 확인 입력"
          onBlur={handleBlurInput}
        />
        <button
          className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
          type="submit"
          disabled={!isFormValid}
        >
          변경
        </button>
      </div>
    </form>
  );
}
