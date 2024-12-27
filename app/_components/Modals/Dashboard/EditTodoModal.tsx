import { useState } from 'react';
import { updateCard } from '@/api/cards.api';
import GenericModal from '@/_components/Modals/GenericModal';
import { TodoFormContent } from '@/_components/Modals/Dashboard/TodoFormContent';
import { FormDataValue } from '@/_types/todo-prop.type';
import { TodoFormFooter } from '@/_components/Modals/Dashboard/TodoFormFooter';
import { Member } from '@/api/types';
import { UpdateCardParams } from '@/_types/cards.type';

interface EditTodoModalProps {
  cardId: number;
  columnTitle: string;
  defaultValues: UpdateCardParams;
  columns: Array<{ columnId: number; columnTitle: string }>;
  members: Member[];
  onClose: () => void;
}

export default function EditTodoModal({
  columnTitle,
  defaultValues,
  columns,
  members,
  onClose,
}: EditTodoModalProps) {
  const [formData, setFormData] = useState({
    columnId: defaultValues.columnId,
    columnTitle: columnTitle,
    title: defaultValues.title || '',
    description: defaultValues.description || '',
    assigneeUserId: defaultValues.assigneeUserId || 0,
    dueDate: defaultValues.dueDate || '',
    tags: defaultValues.tags || [],
    imageUrl: defaultValues.imageUrl || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const IS_INPUT_VALID =
    formData.title.length > 0 && formData.description.length > 0;

  const handleChange = (field: string, value: FormDataValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditTodo = async () => {
    setIsLoading(true);
    try {
      await updateCard({
        cardId: defaultValues.cardId,
        ...formData,
      });
      onClose();
    } catch (error) {
      alert('할 일 수정에 실패했습니다.');
      console.error('할 일 수정 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GenericModal
      title="할 일 수정"
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
          type="edit"
          isValid={IS_INPUT_VALID}
          isLoading={isLoading}
          onSubmit={handleEditTodo}
          onClose={onClose}
        />
      }
      onClose={onClose}
    />
  );
}
