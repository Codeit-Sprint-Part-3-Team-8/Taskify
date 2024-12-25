interface ValidationType {
  isValid: boolean;
  message: string;
}

interface ProfileValidationsType {
  nickname: ValidationType;
  profileImageUrl: ValidationType;
}

interface PasswordValidationsType {
  current: ValidationType;
  changed: ValidationType;
  confirmed: ValidationType;
}

interface ProfileFormProps {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}
export type {
  ProfileValidationsType,
  PasswordValidationsType,
  ProfileFormProps,
  ValidationType,
};
