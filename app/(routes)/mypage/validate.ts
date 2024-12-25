import Validator from '@/_lib/validator';
import {
  PasswordValidationsType,
  ProfileValidationsType,
  ValidationType,
} from './types';

const DEFAULT_PROFILE_VALIDATIONS: ProfileValidationsType = {
  nickname: { isValid: false, message: '' },
  profileImageUrl: { isValid: false, message: '' },
};

const DEFAULT_PASSWORD_VALIDATIONS: PasswordValidationsType = {
  current: { isValid: false, message: '' },
  changed: { isValid: false, message: '' },
  confirmed: { isValid: false, message: '' },
};

const validate: {
  [key: string]: (value: unknown) => ValidationType;
} = {
  nickname: (value: unknown) => {
    if (typeof value === 'string') {
      const schema = new Validator(value as string)
        .required('닉네임을 입력해주세요')
        .minLength(2, '닉네임을 2자 이상 입력해주세요')
        .maxLength(10, '닉네임을 10자 이하로 입력해주세요');
      return {
        isValid: schema.validate(),
        message: schema.validate() ? '' : schema.getErrors()[0],
      };
    }
    return { isValid: false, message: '잘못된 형식의 입력입니다.' };
  },
  profileImageUrl: (value: unknown) => {
    if (value === null) return { isValid: true, message: '' };

    if (typeof value === 'string') {
      const schema = new Validator(value).isUrl('잘못된 Url 형식입니다.');
      return {
        isValid: schema.validate(),
        message: schema.validate() ? '' : schema.getErrors()[0],
      };
    }

    return { isValid: false, message: '잘못된 형식의 입력입니다.' };
  },
  password: (value: unknown) => {
    if (typeof value === 'string') {
      const schema = new Validator(value)
        .required('비밀번호를 입력해주세요.')
        .minLength(8);
      return {
        isValid: schema.validate(),
        message: schema.validate() ? '' : schema.getErrors()[0],
      };
    }
    return { isValid: false, message: '잘못된 형식의 입력입니다.' };
  },
};

function confirmPassword({
  changed,
  confirmed,
  equal = true,
  message,
}: {
  changed: string;
  confirmed: string;
  equal?: boolean;
  message: string;
}): ValidationType {
  const _changed = changed.trim();
  const _confirmed = confirmed.trim();

  const compared = _changed === _confirmed;
  const isValid = equal ? compared : !compared;
  const _message = !isValid && _confirmed.length > 0 ? message : '';

  return {
    isValid: isValid,
    message: _message,
  };
}

export {
  DEFAULT_PROFILE_VALIDATIONS,
  DEFAULT_PASSWORD_VALIDATIONS,
  validate,
  confirmPassword,
};
