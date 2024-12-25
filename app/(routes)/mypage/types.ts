interface ValidationType {
  isValid: boolean;
  message: string;
}

interface ValidationsType {
  nickname: ValidationType;
  profileImageUrl: ValidationType;
}

interface ProfileFormProps {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}
export type { ValidationsType, ProfileFormProps, ValidationType };
