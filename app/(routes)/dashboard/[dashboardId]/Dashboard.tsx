import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { throttle } from 'lodash';
import Droppable from './Droppable';
import { Item } from './Item';
import moveBetweenContainers from './MoveBetweenContainers';
import { CardListType } from '@/_types/cards.type';
import { DashboardType } from '@/_types/dashboards.type';
import { getColumnList } from '@/api/columns.api';
import { getCardList, updateCard } from '@/api/cards.api';
import CreateColumnButton from './CreateColumnButton';

export type ItemGroupsType = {
  [columnId: string]: { title: string; cardData: CardListType };
};

export type OnColumnCreatedType = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => void;

export default function DashBoard({ dashBoard }: { dashBoard: DashboardType }) {
  const [itemGroups, setItemGroups] = useState<ItemGroupsType>({});
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
              } catch (error) {
                console.error(
                  `Error fetching cards for column: ${column.title}`,
                  error,
                );
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
      } catch (error) {
        console.error('Error fetching columns or cards:', error);
      }
    };

    fetchColumnsAndCards(dashBoard.id);
  }, [dashBoard.id]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
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

            // console.log('after move itemGroups: ', itemGroups);
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
      setActiveId(null);
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
        assigneeUserId: assignee.id,
        title: title,
        description: description,
        dueDate: dueDate,
        tags: tags,
        imageUrl: imageUrl,
      });
      console.log('updateCard');
    } catch {
      setItemGroups(prevItemGroups);
    }
  };

  const handleColumnCreated = ({
    id,
    title,
  }: {
    id: number;
    title: string;
  }) => {
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      [id]: {
        title: title,
        cardData: { cursorId: null, totalCount: 1, cards: [] },
      },
    }));
  };

  const handleColumnUpdated = ({
    id,
    title,
  }: {
    id: number;
    title: string;
  }) => {
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

  return (
    <div className="sidebar-right-content">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
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
            />
          ))}

          <CreateColumnButton
            dashboardId={dashBoard.id}
            onColumnCreated={handleColumnCreated}
          />
        </div>
        <DragOverlay>
          {activeId ? <Item id={activeId} dragOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
