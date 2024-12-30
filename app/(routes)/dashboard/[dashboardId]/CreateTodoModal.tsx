import { useState } from 'react';
import { createCard } from '@/api/cards.api';
import { MemberType } from '@/_types/members.type';
import { TodoFormContent } from '@/_components/Modals/DashboardModal/TodoFormContent';
import GenericModal from '@/_components/Modals/GenericModal';
import { TodoFormFooter } from '@/_components/Modals/DashboardModal/TodoFormFooter';
import { FormDataValue } from '@/_types/todo-prop.type';
import { CardType } from '@/_types/cards.type';

interface CreateTodoModalProps {
  dashboardId: number;
  columnData: {
    id: number;
    title: string;
  };
  members: MemberType[];
  onClose: () => void;
  onAddCard: (columnId: number, newCard: CardType) => void;
}

export default function CreateTodoModal({
  dashboardId,
  columnData,
  members,
  onClose,
  onAddCard,
}: CreateTodoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    assigneeUserId: undefined,
    title: '',
    description: '',
    dueDate: undefined,
    tags: [],
    imageUrl: undefined,
  });

  const IS_INPUT_VALID =
    formData.title.length > 0 && formData.description.length > 0;

  const handleChange = (field: string, value: FormDataValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateTodo = async () => {
    setIsLoading(true);
    try {
      const response = await createCard({
        dashboardId,
        columnId: columnData.id,
        title: formData.title,
        description: formData.description,
        assigneeUserId: formData.assigneeUserId,
        dueDate: formData.dueDate,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
      });
      onAddCard(columnData.id, response);
      onClose();
    } catch (error) {
      alert('할 일 생성에 실패했습니다.');
      console.error('할 일 생성 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GenericModal
      title="할 일 생성"
      mainContent={
        <TodoFormContent
          formData={formData}
          currentColumn={columnData}
          onChange={handleChange}
          members={members}
          isLoading={isLoading}
        />
      }
      footerContent={
        <TodoFormFooter
          type="create"
          isValid={IS_INPUT_VALID}
          isLoading={isLoading}
          onSubmit={handleCreateTodo}
          onClose={onClose}
        />
      }
      onClose={onClose}
    />
  );
}
