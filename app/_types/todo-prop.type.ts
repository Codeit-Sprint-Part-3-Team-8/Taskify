// 폼 데이터의 기본 구조
export interface TodoFormData {
  columnId: number;
  columnTitle: string;
  assigneeId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags: string[];
  imageUrl?: string;
}

// 폼 필드의 키 타입
export type FormDataField = keyof TodoFormData;

// 각 필드의 가능한 값 타입
export type FormDataValue = TodoFormData[FormDataField];
