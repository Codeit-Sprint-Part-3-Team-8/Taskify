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
import { dashBoardType } from './page';
import { getColumns } from '@/api/columns';
import { getCardsByColumn } from '@/api/cards';

export interface cardType {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export type itemGroupsType = {
  [columnId: string]: { title: string; cards: cardType[] };
};

export default function DashBoard({ dashBoard }: { dashBoard: dashBoardType }) {
  const [itemGroups, setItemGroups] = useState<itemGroupsType>({});
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
        const columnsData = await getColumns({ id: dashboardId });
        const newItemGroups = (
          await Promise.all(
            columnsData.map(async (column) => {
              try {
                const cards: cardType[] =
                  (await getCardsByColumn({ columnId: column.id, size: 10 })) ||
                  [];
                return {
                  [column.id]: { title: column.title, cards: cards },
                };
              } catch (error) {
                console.error(
                  `Error fetching cards for column: ${column.title}`,
                  error,
                );
                return {
                  [column.id]: { title: column.title, cards: [] },
                };
              }
            }),
          )
        ).reduce((acc, group) => ({ ...acc, ...group }), {});

        setItemGroups(newItemGroups);
      } catch (error) {
        console.error('Error fetching columns or cards:', error);
      }
    };

    fetchColumnsAndCards(dashBoard.id);
  }, [dashBoard.id]);

  const handleDragStart = ({ active }: DragStartEvent) =>
    setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const throttledHandleDragOver = useMemo(
    () =>
      throttle(
        (active: DragOverEvent['active'], over: DragOverEvent['over']) => {
          const overId = over?.id;

          if (!overId) return;

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
                ? itemGroups[overContainer].cards.length + 1
                : over.data.current?.sortable.index;

            return moveBetweenContainers({
              items: itemGroups,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              item: active.id,
            });
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

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].cards.length + 1
          : over.data.current?.sortable.index;

      if (
        !activeContainer ||
        !overContainer ||
        activeIndex == null ||
        overIndex == null
      ) {
        return;
      }

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer].cards,
              activeIndex,
              overIndex,
            ),
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
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="m-4 flex w-fit justify-center rounded border border-gray-400 p-2">
        {Object.keys(itemGroups).map((itemGroup) => (
          <Droppable
            key={itemGroup}
            id={itemGroup}
            title={itemGroups[itemGroup].title}
            items={itemGroups[itemGroup].cards || []}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <Item id={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
