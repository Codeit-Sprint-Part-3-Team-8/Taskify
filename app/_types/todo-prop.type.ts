export interface TodoFormData {
  columnId?: number;
  columnTitle?: string;
  assigneeId: number;
  title: string;
  description: string;
  deadline?: string;
  tags: string[];
  imageUrl?: string;
}

export type FormDataField = keyof TodoFormData;

export type FormDataValue =
  | number // columnId, assigneeId
  | string // columnTitle, title, description, deadline, imageUrl
  | string[] // tags
  | undefined; // deadline, imageUrl
