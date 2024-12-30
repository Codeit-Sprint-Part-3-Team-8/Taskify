import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import Droppable from './Droppable';
import { Item } from './Item';
import moveBetweenContainers from './MoveBetweenContainers';
import { CardListType, CardType } from '@/_types/cards.type';
import { DashboardType } from '@/_types/dashboards.type';
import { getColumnList } from '@/api/columns.api';
import { getCardList, updateCard } from '@/api/cards.api';
import CreateColumnButton from './CreateColumnButton';
import KanbanLoading from './DashboardLoading';
import EditTodoModal from './EditTodoModal';
import useAsync from '@/_hooks/useAsync';
import { getMemberList } from '@/api/member.api';
import CreateTodoModal from './CreateTodoModal';
import { useAuth } from '@/context/AuthContext';
import TodoCardModal from './_TodoCardModal';

export type ItemGroupsType = {
  [columnId: string]: { title: string; cardData: CardListType };
};

export type OnColumnHandlerParams = {
  id: number;
  title?: string;
};

export type OnColumnHandlerType = ({
  id,
  title,
}: OnColumnHandlerParams) => void;

export type ColumnData = {
  id: number;
  title: string;
};

export default function DashBoard({ dashBoard }: { dashBoard: DashboardType }) {
  const {} = useAuth(true);
  const [itemGroups, setItemGroups] = useState<ItemGroupsType>({});
  const [isLoading, setIsLoading] = useState(true);
  const [dragActiveCard, setDragActiveCard] = useState<
    CardType | null | undefined
  >(null);
  const [selectedCard, setSelecedCard] = useState<CardType | null>(null);
  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedColumn, setSelecedColumn] = useState<ColumnData | null>(null);
  const [isCreateCardModalVisible, setIsCreateCardModalVisible] =
    useState(false);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { data: members, excute: fetchMembers } = useAsync(
    async ({ dashboardId }: { dashboardId: number }) =>
      getMemberList({ dashboardId, page: 1, size: 20 }),
  );

  const fetchMembersRef = useRef(fetchMembers);

  useEffect(() => {
    if (!dashBoard.id) return;
    fetchMembersRef.current({ dashboardId: dashBoard.id });
  }, [dashBoard.id]);

  useEffect(() => {
    if (!dashBoard.id) return;

    const fetchColumnsAndCards = async (dashboardId: number) => {
      try {
        const columnsData = await getColumnList({ dashboardId: dashboardId });
        const newItemGroups = (
          await Promise.all(
            columnsData.data.map(async (column) => {
              try {
                const response =
                  (await getCardList({ columnId: column.id, size: 10 })) || [];

                return {
                  [column.id]: { title: column.title, cardData: response },
                };
              } catch {
                return {
                  [column.id]: {
                    title: column.title,
                    cardData: { card: [], cursorId: null, totalCount: 0 },
                  },
                };
              }
            }),
          )
        ).reduce((acc: ItemGroupsType, group) => ({ ...acc, ...group }), {});
        setItemGroups(newItemGroups);
        setIsLoading(false);
      } catch {
        alert('대쉬보드 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    fetchColumnsAndCards(dashBoard.id);
  }, [dashBoard.id]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    const containerId = active.data.current?.sortable.containerId;
    const currentCard = itemGroups[containerId].cardData.cards.find(
      (card) => card.id === active.id,
    );

    setDragActiveCard(currentCard);
  };

  const handleDragCancel = () => {
    setDragActiveCard(null);
  };

  const throttledHandleDragOver = useMemo(
    () =>
      throttle(
        (active: DragOverEvent['active'], over: DragOverEvent['over']) => {
          const overId = over?.id;

          if (!overId || active.id === over.id) return;

          const activeContainer = active.data.current?.sortable.containerId;
          const overContainer =
            over.data.current?.sortable.containerId || over.id;

          if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
          ) {
            return;
          }

          setItemGroups((itemGroups) => {
            const activeIndex = active.data.current?.sortable.index;
            const overIndex =
              over.id in itemGroups
                ? itemGroups[overContainer].cardData.cards.length + 1
                : over.data.current?.sortable.index;

            const data = moveBetweenContainers({
              items: itemGroups,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              item: active.id,
            });

            return data;
          });
        },
        100,
      ),
    [],
  );

  const handleDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      throttledHandleDragOver(active, over);
    },
    [throttledHandleDragOver],
  );

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) {
      setDragActiveCard(null);
      return;
    }

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current?.sortable.index;
    const overIndex =
      over.id in itemGroups
        ? itemGroups[overContainer].cardData.cards.length + 1
        : over.data.current?.sortable.index;

    if (
      !activeContainer ||
      !overContainer ||
      activeIndex == null ||
      overIndex == null
    ) {
      return;
    }

    const prevItemGroups = structuredClone(itemGroups);

    setItemGroups((itemGroups) => {
      let newItems;
      if (activeContainer === overContainer) {
        newItems = {
          ...itemGroups,
          [overContainer]: {
            ...itemGroups[overContainer],
            cardData: {
              ...itemGroups[overContainer].cardData,
              cards: arrayMove(
                itemGroups[overContainer].cardData.cards,
                activeIndex,
                overIndex,
              ),
            },
          },
        };
      } else {
        newItems = moveBetweenContainers({
          items: itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          item: active.id,
        });
      }

      return newItems;
    });

    try {
      const { id, assignee, title, description, dueDate, tags, imageUrl } =
        itemGroups[overContainer].cardData.cards[activeIndex];

      await updateCard({
        cardId: id,
        columnId: Number(activeContainer),
        assigneeUserId: assignee.id || null,
        title: title,
        description: description,
        dueDate: dueDate || null,
        tags: tags,
        imageUrl: imageUrl || null,
      });
    } catch {
      setItemGroups(prevItemGroups);
    }
  };

  const handleAddNewCard = (columnId: number, newCard: CardType) => {
    setItemGroups((itemGroups) => {
      const newItemGroups = {
        ...itemGroups,
        [columnId]: {
          ...itemGroups[columnId],
          cardData: {
            cursorId: itemGroups[columnId].cardData.cursorId,
            totalCount: itemGroups[columnId].cardData.totalCount + 1,
            cards: [...itemGroups[columnId].cardData.cards, newCard],
          },
        },
      };

      return newItemGroups;
    });
  };

  const handleUpdateCard = (columnId: number, updatedCard: CardType) => {
    setItemGroups((itemGroups) => {
      const updatedItemGroups = {
        ...itemGroups,
        [columnId]: {
          ...itemGroups[columnId],
          cardData: {
            ...itemGroups[columnId].cardData,
            cards: itemGroups[columnId].cardData.cards.map((card) =>
              card.id === updatedCard.id ? { ...card, ...updatedCard } : card,
            ),
          },
        },
      };

      return updatedItemGroups;
    });
  };

  const handleColumnCreated = ({ id, title }: OnColumnHandlerParams) => {
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      [id]: {
        title: title,
        cardData: { cursorId: null, totalCount: 1, cards: [] },
      },
    }));
  };

  const handleColumnUpdated = ({ id, title }: OnColumnHandlerParams) => {
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      [id]: {
        ...prevItemGroups[id],
        title: title,
      },
    }));
  };

  const handleColumnDeleted = ({ id }: { id: number }) => {
    setItemGroups((prevItemGroups) => {
      const newItemGroups = { ...prevItemGroups };
      delete newItemGroups[id];

      return newItemGroups;
    });
  };

  const handleClickColumn = ({ id, title }: ColumnData) => {
    setSelecedColumn({ id, title });
  };

  const handleClickCreateCard = ({ id, title }: ColumnData) => {
    setSelecedColumn({ id, title });
    setIsCreateCardModalVisible(true);
  };

  const handleClickCard = (card: CardType) => {
    setSelecedCard(card);
    setIsCardModalVisible(true);
  };

  const handleDeleteCard = (columnId: number, cardId: number) => {
    setItemGroups((itemGroups) => {
      const updatedItemGroups = {
        ...itemGroups,
        [columnId]: {
          ...itemGroups[columnId],
          cardData: {
            ...itemGroups[columnId].cardData,
            totalCount: itemGroups[columnId].cardData.totalCount - 1,
            cards: itemGroups[columnId].cardData.cards.filter(
              (card) => card.id !== cardId,
            ),
          },
        },
      };

      return updatedItemGroups;
    });
  };

  const handleCloseCardModal = () => {
    setIsCardModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <div className="sidebar-right-content">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {isLoading ? (
          <div className="flex h-[400px] w-full items-center justify-center bg-gray-50">
            <KanbanLoading />
          </div>
        ) : (
          <div className="mt-[60px] flex w-full mobile:flex-col tablet:mt-[70px] pc:flex-row pc:justify-between pc:divide-x pc:divide-gray-200 pc:pr-[184px]">
            {Object.keys(itemGroups).map((itemGroup) => (
              <Droppable
                key={itemGroup}
                id={itemGroup}
                dashBoardColor={dashBoard.color}
                title={itemGroups[itemGroup].title}
                items={itemGroups[itemGroup].cardData.cards || []}
                onColumnUpdated={handleColumnUpdated}
                onColumnDeleted={handleColumnDeleted}
                onClickCard={handleClickCard}
                onClickCreateCard={handleClickCreateCard}
                onClickColumn={handleClickColumn}
              />
            ))}

            <CreateColumnButton
              dashboardId={dashBoard.id}
              onColumnCreated={handleColumnCreated}
            />
          </div>
        )}
        <DragOverlay>
          {dragActiveCard ? <Item item={dragActiveCard} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>

      {isCreateCardModalVisible && selectedColumn && (
        <CreateTodoModal
          dashboardId={dashBoard.id}
          columnData={selectedColumn}
          members={members?.members || []}
          onClose={() => setIsCreateCardModalVisible(false)}
          onAddCard={handleAddNewCard}
        />
      )}

      {isCardModalVisible && selectedCard && selectedColumn && (
        <>
          <TodoCardModal
            cardId={selectedCard.id}
            column={selectedColumn}
            dashboardId={dashBoard.id}
            onClose={handleCloseCardModal}
            onEditClick={() => setIsEditModalVisible(true)}
            onDeleteCard={handleDeleteCard}
          />
        </>
      )}

      {isEditModalVisible && selectedCard && selectedColumn && (
        <EditTodoModal
          columnTitle={itemGroups[selectedCard.columnId].title}
          card={selectedCard}
          columns={Object.entries(itemGroups).map(([columnId, { title }]) => ({
            columnId: Number(columnId),
            columnTitle: title,
          }))}
          currentColumn={selectedColumn}
          members={members?.members || []}
          onEditCard={handleUpdateCard}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
