import InputField from '@/_components/Auth/InputField';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ImageInputField from './ImageInputField';
import useAsync from '@/_hooks/useAsync';
import { createProfileImage, updateUser } from '@/api/users.api';

interface ProfileFormProps {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

const INIT_VALUES: ProfileFormProps = {
  email: '',
  nickname: '',
  profileImageUrl: null,
};

export default function ProfileForm({
  email,
  nickname,
  profileImageUrl,
}: ProfileFormProps) {
  const [values, setValues] = useState(INIT_VALUES);
  const { data: profileDate, excute: fetchProfile } =
    useAsync(createProfileImage);
  const { data: updateData, excute: _updateUser } = useAsync(updateUser);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProfile = (value: FormData | null) => {
    if (value) {
      fetchProfile({ image: value });
    } else {
      setValues((prev) => ({
        ...prev,
        profileImageUrl: null,
      }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    _updateUser({
      nickname: values.nickname,
      profileImageUrl: values.profileImageUrl,
    });
  };

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      profileImageUrl: profileDate?.profileImageUrl as string,
    }));
  }, [profileDate]);

  useEffect(() => {
    console.log(updateData);
  }, [updateData]);

  useEffect(() => {
    setValues((prev) => ({ ...prev, email, nickname }));
  }, [email, nickname]);

  return (
    <form
      className="min-w-[18rem] rounded-lg bg-white p-4 tablet:w-[42rem] tablet:rounded-2xl tablet:p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-10 text-2lg font-bold text-black-333236 tablet:mb-6 tablet:text-2xl">
        프로필
      </h2>
      <div className="tablet:flex">
        <ImageInputField
          initProfileImageUrl={profileImageUrl}
          profileImageUrl={values.profileImageUrl}
          onChange={handleChangeProfile}
        />
        <div className="mt-10 flex flex-col gap-2 tablet:ml-10 tablet:mt-0 tablet:grow">
          <InputField
            name="email"
            type="text"
            placeholder={email}
            value={''}
            validation={{ isValid: false, message: '' }}
            readonly={true}
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
