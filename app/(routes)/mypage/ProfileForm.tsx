import InputField from '@/_components/Auth/InputField';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ImageInputField from './ImageInputField';
import useAsync from '@/_hooks/useAsync';
import { createProfileImage, updateUser } from '@/api/users.api';
import { ProfileFormProps, ProfileValuesType } from './types';
import { DEFAULT_PROFILE_VALIDATIONS, validate } from './validate';
import Modal from '@/_components/Auth/Modal';

const DEFAULT_VALUES: ProfileValuesType = {
  email: '',
  nickname: '',
  profileImageUrl: null,
};

export default function ProfileForm({
  email,
  nickname,
  profileImageUrl,
  update,
}: ProfileFormProps) {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [validations, setValidations] = useState(DEFAULT_PROFILE_VALIDATIONS);
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    data: profileData,
    excute: _createProfileImage,
    errorMessage: imageErrorMessage,
    clear: claerProfileImage,
  } = useAsync(createProfileImage);
  const {
    data: updateData,
    excute: _updateUser,
    errorMessage: updateErrorMessage,
  } = useAsync(updateUser);
  const [showUpdateError, setShowUpdateError] = useState(false);
  const [showImageError, setShowImageError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClickCloseUpdateError = () => setShowUpdateError(false);
  const handleClickCloseImageError = () => setShowImageError(false);
  const handleClickCloseSuccess = () => setShowSuccess(false);

  /**
   * 프로필 폼 입력 필드 값 변경 핸들러
   * - 입력값 상태 관리
   */
  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /**
   * 프로필 이미지 URL 생성 요청 혹은 제거 핸들러
   * @param value
   */
  const handleChangeProfile = (value: FormData | null) => {
    if (value) {
      _createProfileImage({ image: value });
    } else {
      claerProfileImage();
    }
  };

  /**
   * 닉네임 변경 시 유효성 검사
   */
  useEffect(() => {
    setValidations((prev) => ({
      ...prev,
      nickname: validate.nickname(values.nickname),
    }));
  }, [values.nickname]);

  /**
   * 프로필 URL 변경 시 유효성 검사
   */
  useEffect(() => {
    setValidations((prev) => ({
      ...prev,
      profileImageUrl: validate.profileImageUrl(values.profileImageUrl),
    }));
  }, [values.profileImageUrl]);

  /**
   * 유저 프로필 변경 요청
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    _updateUser({
      nickname: values.nickname,
      profileImageUrl: values.profileImageUrl,
    });
  };

  /**
   * 폼 유효성 검사. 아래 조건을 모두 만족시키면 유효함
   * - 프로필 URL, 닉네임 유효함
   * - 프로필 URL과 닉네임 중 하나 이상 변경
   */
  useEffect(() => {
    const isValid =
      validations.nickname.isValid && validations.profileImageUrl.isValid;
    const isChanged =
      profileImageUrl !== values.profileImageUrl ||
      nickname !== values.nickname;
    setIsFormValid(isValid && isChanged);
  }, [validations, nickname, profileImageUrl, values]);

  /**
   * 프로필 이미지 생성 요청 성공 시
   * - 프로필 URL 상태 관리
   */
  useEffect(() => {
    const next = profileData?.profileImageUrl as string;
    setValues((prev) => ({
      ...prev,
      profileImageUrl: next,
    }));
  }, [profileData]);

  /**
   * 프로필 정보 업데이트 시 반영
   */
  useEffect(() => {
    update();
  }, [updateData, update]);

  /**
   * 프로필 정보 업데이트 시 반영
   */
  useEffect(() => {
    setValues({ email, nickname, profileImageUrl });
  }, [email, nickname, profileImageUrl]);

  useEffect(() => {
    if (updateErrorMessage) {
      setShowUpdateError(true);
    }
  }, [updateErrorMessage]);

  useEffect(() => {
    if (imageErrorMessage) {
      setShowUpdateError(true);
    }
  }, [imageErrorMessage]);

  useEffect(() => {
    if (updateData) {
      setShowSuccess(true);
    }
  }, [updateData]);

  return (
    <>
      {showSuccess && (
        <Modal
          text="프로필 변경에 성공했습니다."
          onClick={handleClickCloseSuccess}
        />
      )}
      {showUpdateError && (
        <Modal
          text={updateErrorMessage as string}
          onClick={handleClickCloseUpdateError}
        />
      )}
      {showImageError && (
        <Modal
          text={imageErrorMessage as string}
          onClick={handleClickCloseImageError}
        />
      )}
      <form
        className="min-w-[18rem] rounded-lg bg-white p-4 tablet:w-[42rem] tablet:rounded-2xl tablet:p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-10 text-2lg font-bold text-black-333236 tablet:mb-6 tablet:text-2xl">
          프로필
        </h2>
        <div className="tablet:flex">
          <ImageInputField
            profileImageUrl={values.profileImageUrl}
            onChange={handleChangeProfile}
          />
          <div className="mt-10 flex flex-col gap-4 tablet:ml-10 tablet:mt-0 tablet:grow">
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
              validation={validations.nickname}
              onChange={handleChangeValue}
            />
            <button
              className="w-full select-none rounded-lg border bg-violet-5534DA py-3.5 text-lg font-medium text-white disabled:bg-gray-9FA6B2"
              type="submit"
              disabled={!isFormValid}
            >
              저장
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
