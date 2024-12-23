import InputField from '@/_components/Auth/InputField';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageInputField from './ImageInputField';

interface ProfileFormProps {
  email: string;
  nickname: string;
}

const INIT_VALUES: ProfileFormProps = {
  email: '',
  nickname: '',
};

export default function ProfileForm({ email, nickname }: ProfileFormProps) {
  const [values, setValues] = useState(INIT_VALUES);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValues({ email, nickname });
  }, [email, nickname]);

  return (
    <form className="w-[18rem] rounded-lg bg-white p-4 tablet:w-[42rem] tablet:rounded-2xl tablet:p-6">
      <h2 className="mb-10 text-2lg font-bold text-black-333236 tablet:mb-6 tablet:text-2xl">
        프로필
      </h2>
      <div className="tablet:flex">
        <ImageInputField />
        <div className="mt-10 flex flex-col gap-2 tablet:ml-10 tablet:mt-0 tablet:grow">
          <InputField
            name="email"
            type="text"
            placeholder={email}
            value={values.email}
            validation={{ isValid: false, message: '' }}
            onChange={handleChangeValue}
          />
          <InputField
            name="nickname"
            type="text"
            placeholder={nickname}
            value={values.nickname}
            validation={{ isValid: false, message: '' }}
            onChange={handleChangeValue}
          />
          <button
            className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
            type="submit"
          >
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
