import Validator from '@/_lib/validator';
import { ValidationType, ValuesType } from './loginType';

const DEFAULT_VALIDATIONS: ValidationType = {
  email: { isValid: false, message: '' },
  password: { isValid: false, message: '' },
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
      return email;
    case 'password':
      const passwordSchema = new Validator(values.password)
        .required('비밀번호를 입력해주세요')
        .minLength(8, '비밀번호를 8자 이상 입력해주세요');

      const password = {
        isValid: passwordSchema.validate(),
        message: passwordSchema.validate() ? '' : passwordSchema.getErrors()[0],
      };
      return password;
  }
}

export { validateSchema, DEFAULT_VALIDATIONS };
export type { ValidationType };
