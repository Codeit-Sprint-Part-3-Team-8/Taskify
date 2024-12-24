import Validator from '@/_lib/validator';
import { ValidationType, ValuesType } from './signupType';

const DEFAULT_VALIDATIONS: ValidationType = {
  email: { isValid: false, message: '' },
  nickname: { isValid: false, message: '' },
  password: { isValid: false, message: '' },
  repeat: { isValid: false, message: '' },
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
      return { email };
    case 'nickname':
      const nicknameSchema = new Validator(values.nickname)
        .required('닉네임을 입력해주세요')
        .minLength(2, '닉네임을 2자 이상 입력해주세요')
        .maxLength(10, '닉네임을 10자 이하로 입력해주세요');
      const nickname = {
        isValid: nicknameSchema.validate(),
        message: nicknameSchema.validate() ? '' : nicknameSchema.getErrors()[0],
      };
      return { nickname };
    case 'password':
    case 'repeat':
      const passwordSchema = new Validator(values.password)
        .required('비밀번호를 입력해주세요')
        .minLength(8, '비밀번호를 8자 이상 입력해주세요');

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
        password,
        repeat,
      };
  }
}

export { validateSchema, DEFAULT_VALIDATIONS };
export type { ValidationType };
