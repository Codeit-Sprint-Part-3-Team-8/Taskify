import { useState } from 'react';
import { updateCard } from '@/api/cards.api';
import GenericModal from '@/_components/Modals/GenericModal';
import { TodoFormContent } from '@/_components/Modals/DashboardModal/TodoFormContent';
import { FormDataValue } from '@/_types/todo-prop.type';
import { TodoFormFooter } from '@/_components/Modals/DashboardModal/TodoFormFooter';
import { CardType } from '@/_types/cards.type';

interface EditTodoModalProps {
  columnTitle: string;
  card: CardType;
  columns: Array<{ columnId: number; columnTitle: string }>;
  onClose: () => void;
}

export default function EditTodoModal({
  columnTitle,
  card,
  columns,
  onClose,
}: EditTodoModalProps) {
  const [formData, setFormData] = useState({
    columnId: card.columnId,
    columnTitle: columnTitle,
    title: card.title || '',
    description: card.description || '',
    assigneeUserId: card.assignee.id || 0,
    dueDate: card.dueDate || '',
    tags: card.tags || [],
    imageUrl: card.imageUrl || '',
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
        cardId: card.id,
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
  console.log('edit');
  return (
    <GenericModal
      title="할 일 수정"
      mainContent={
        <TodoFormContent
          formData={formData}
          onChange={handleChange}
          columns={columns}
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
