interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface CardListType {
  cursorId: number | null;
  totalCount: number;
  cards: CardType[];
}

interface CreateCardParams {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string | null;
}

interface GetCardListParams {
  size?: number;
  cursorId?: number;
  columnId: number;
}

interface UpdateCardParams {
  cardId: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string | null;
}

interface GetCardParams {
  cardId: number;
}

interface DeleteCardParams {
  cardId: number;
}

export type {
  CreateCardParams,
  CardType,
  GetCardListParams,
  CardListType,
  UpdateCardParams,
  GetCardParams,
  DeleteCardParams,
};
