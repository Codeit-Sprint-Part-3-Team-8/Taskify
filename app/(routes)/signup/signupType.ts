interface ValuesType {
  email: string;
  nickname: string;
  password: string;
  repeat: string;
}

interface ValidationType {
  email: { isValid: boolean; message: string };
  nickname: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
  repeat: { isValid: boolean; message: string };
}

export type { ValuesType, ValidationType };
