import {
  CardListType,
  CardType,
  CreateCardParams,
  DeleteCardParams,
  GetCardListParams,
  GetCardParams,
  UpdateCardParams,
} from '@/_types/cards.type';
import axios from './axios';

async function createCard({
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: CreateCardParams): Promise<CardType> {
  const response = await axios.post('/cards', {
    assigneeUserId,
    dashboardId,
    columnId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });
  return response.data;
}

async function getCardList({
  size = 10,
  cursorId,
  columnId,
}: GetCardListParams): Promise<CardListType> {
  const response = await axios.get('/cards', {
    params: { size, cursorId, columnId },
  });
  return response.data;
}

async function updateCard({
  cardId,
  columnId,
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: UpdateCardParams): Promise<CardType> {
  const response = await axios.put(`/cards/${cardId}`, {
    cardId,
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });
  return response.data;
}

async function getCard({ cardId }: GetCardParams): Promise<CardType> {
  const response = await axios.get(`/cards/${cardId}`);
  return response.data;
}

async function deleteCard({ cardId }: DeleteCardParams) {
  const response = await axios.delete(`/cards/${cardId}`);
  return response.data;
}

export { createCard, getCardList, updateCard, getCard, deleteCard };
