import InputField from '@/_components/Auth/InputField';
import { ChangeEvent, useState } from 'react';

const INIT_VALUES = {
  current: '',
  new: '',
  repeat: '',
};

export default function PasswordForm() {
  const [values, setValues] = useState(INIT_VALUES);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(values);

  return (
    <form className="w-[18rem] rounded-lg bg-white p-4 tablet:w-[42rem] tablet:rounded-2xl tablet:p-6">
      <h2 className="mb-10 text-2lg font-bold text-black-333236 tablet:mb-6 tablet:text-2xl">
        비밀번호 변경
      </h2>
      <div className="flex flex-col gap-2">
        <InputField
          name="current"
          value={values.current}
          onChange={handleChangeValue}
          validation={{ isValid: false, message: '' }}
          label="현재 비밀번호"
          placeholder="비밀번호 입력"
        />
        <InputField
          name="new"
          value={values.new}
          onChange={handleChangeValue}
          validation={{ isValid: false, message: '' }}
          label="새 비밀번호"
          placeholder="새 비밀번호 입력"
        />
        <InputField
          name="repeat"
          value={values.repeat}
          onChange={handleChangeValue}
          validation={{ isValid: false, message: '' }}
          label="새 비밀번호 확인"
          placeholder="새 비밀번호 확인 입력"
        />
        <button
          className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
          type="submit"
        >
          변경
        </button>
      </div>
    </form>
  );
}
