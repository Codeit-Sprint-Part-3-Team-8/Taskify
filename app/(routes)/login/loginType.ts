interface ValuesType {
  email: string;
  password: string;
}

interface ValidationType {
  email: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
}

export type { ValidationType, ValuesType };
