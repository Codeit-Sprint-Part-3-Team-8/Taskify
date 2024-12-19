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
import { useState, useCallback, useMemo } from 'react';
import { throttle } from 'lodash';
import Droppable from './Droppable';
import { Item } from './Item';
import moveBetweenContainers from './MoveBetweenContainers';

export interface ItemGroupsProps {
  todo: string[];
  inProgress: string[];
  done: string[];
}

export default function DashBoard({
  initialData,
}: {
  initialData: ItemGroupsProps;
}) {
  const [itemGroups, setItemGroups] = useState<ItemGroupsProps>(initialData);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) =>
    setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const throttledHandleDragOver = useMemo(
    () =>
      throttle(
        (active: DragOverEvent['active'], over: DragOverEvent['over']) => {
          const overId = over?.id;

          if (!overId) {
            return;
          }

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

          if (activeContainer !== overContainer) {
            setItemGroups((itemGroups) => {
              const activeIndex = active.data.current?.sortable.index;
              const overIndex =
                over.id in itemGroups
                  ? itemGroups[overContainer as keyof ItemGroupsProps].length +
                    1
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
          }
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
          ? itemGroups[overContainer as keyof ItemGroupsProps].length + 1
          : over.data.current?.sortable.index;

      if (!activeContainer || !overContainer || !activeIndex || overIndex) {
        return;
      }

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer as keyof ItemGroupsProps],
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
        {Object.keys(itemGroups).map((group) => (
          <Droppable
            id={group}
            items={itemGroups[group as keyof ItemGroupsProps]}
            key={group}
          />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <Item id={activeId} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
