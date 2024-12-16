'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import InputField from './InputField';
import CheckboxField from './CheckboxField';

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

export default function SignUp() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value, event);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCheckbox = () => setIsChecked((prev) => !prev);

  return (
    <div className="fixed left-1/2 right-1/2 top-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 tablet:max-w-lg">
      <header className="mb-7 flex select-none flex-col items-center justify-center">
        <Link href="/">
          <Image
            width={200}
            height={280}
            src="/images/logo-main.svg"
            alt="Taskify"
          />
        </Link>
        <span className="text-xl font-medium text-black-333236">
          첫 방문을 확영합니다!
        </span>
      </header>
      <form className="mb-6 flex flex-col gap-6">
        <InputField
          name="email"
          value={values.email}
          onChange={handleChangeValue}
        />
        <InputField
          name="nickname"
          value={values.nickname}
          onChange={handleChangeValue}
        />
        <InputField
          name="password"
          value={values.password}
          onChange={handleChangeValue}
        />
        <InputField
          name="repeat"
          value={values.repeat}
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
      <footer className="select-none">
        <span>이미 회원이신가요?&nbsp;</span>
        <Link className="text-violet-5534DA underline" href="/login">
          로그인하기
        </Link>
      </footer>
    </div>
  );
}
