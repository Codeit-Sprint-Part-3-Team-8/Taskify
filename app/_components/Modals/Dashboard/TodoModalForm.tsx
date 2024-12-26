import React, { useMemo, useState } from 'react';
import GenericModal from '../GenericModal';
import { TodoFormContent } from './TodoFormContent';
import { TodoFormFooter } from './TodoFormFooter';
import { Member } from '@/api/types';
import { FormDataValue, TodoFormData } from '@/_types/todo-prop.type';
import { CreateCardParams, UpdateCardParams } from '@/_types/cards.type';

interface TodoFormProps<T extends CreateCardParams | UpdateCardParams> {
  type: T extends CreateCardParams ? 'create' : 'edit';
  initialValues?: {
    columnTitle: string;
    columnId: number;
    assignee?: {
      id: number;
      nickname: string;
    };
    title: string;
    description: string;
    dueDate?: string;
    tags?: string[];
    imageUrl?: string;
  };
  columns?: Array<{ columnId: number; columnTitle: string }>;
  members: Member[];
  isLoading: boolean;
  onSubmit: (formData: T) => Promise<void>;
  onClose: () => void;
}

export function TodoModalForm<T extends CreateCardParams | UpdateCardParams>({
  type,
  initialValues,
  columns,
  members,
  isLoading,
  onSubmit,
  onClose,
}: TodoFormProps<T>) {
  const [formData, setFormData] = useState<TodoFormData>({
    columnId: initialValues?.columnId || columns?.[0]?.columnId,
    columnTitle: initialValues?.columnTitle || columns?.[0]?.columnTitle,
    assigneeId: initialValues?.assignee?.id || 0,
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    deadline: initialValues?.dueDate,
    tags: initialValues?.tags || [],
    imageUrl: initialValues?.imageUrl,
  });

  const IS_INPUT_VALID = useMemo(() => {
    return formData.title.length > 0 && formData.description.length > 0;
  }, [formData.title, formData.description]);

  const handleChange = (field: string, value: FormDataValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <GenericModal
      title={type === 'create' ? '할 일 생성' : '할 일 수정'}
      mainContent={
        <TodoFormContent
          formData={formData}
          onChange={handleChange}
          columns={columns}
          members={members}
          isLoading={isLoading}
        />
      }
      footerContent={
        <TodoFormFooter
          type={type}
          isValid={IS_INPUT_VALID}
          isLoading={isLoading}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      }
      onClose={onClose}
    />
  );
}
