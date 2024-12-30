'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ColorSelectBox from './ColorSelectBox';
import Button from '@/_components/Button/Button';
import useAsync from '@/_hooks/useAsync';
import { DashboardType } from '@/_types/dashboards.type';
import { getDashboard, updateDashboard } from '@/api/dashboards.api';

interface ModifyBoxProps {
  dashboardId: number;
}

export default function ModifyBox({ dashboardId }: ModifyBoxProps) {
  const {
    data: dashboardData,
    excute: getDashboardData,
    // loading: dashboardLoading,
    // error: dashboardError,
  } = useAsync(getDashboard);

  const { excute: updateDashBoardAsync } = useAsync(updateDashboard);

  const inputRef = useRef<HTMLInputElement>(null);
  const [dashboardDataState, setDashboardDataState] =
    useState<DashboardType | null>(dashboardData);
  const [isModified, setIsModified] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    await getDashboardData({ dashboardId });
  }, [dashboardId, getDashboardData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) {
      return;
    }
    const param = {
      dashboardId: dashboardDataState?.id || 0,
      title: inputRef.current!.value,
      color: dashboardDataState?.color || '',
    };
    await updateDashBoardAsync(param);
    fetchDashboardData();
  };

  const handleChangeColor = (color: string) => {
    setDashboardDataState({
      ...dashboardDataState!,
      color,
    });

    handleInputChange(null, color);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | null,
    color?: string,
  ) => {
    const inputValue = inputRef.current?.value || '';
    const currentColor = color || dashboardDataState?.color;
    const colorChanged = currentColor !== dashboardData?.color;
    const titleChanged = inputValue !== dashboardData?.title;

    if (inputValue === '') {
      setIsModified(false);
    } else {
      setIsModified(titleChanged || colorChanged);
    }
  };

  useEffect(() => {
    setDashboardDataState(dashboardData);
  }, [dashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="mx-3 rounded-2xl bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      {/* 박스 */}
      <form onSubmit={handleSubmit}>
        <div className="pb-10">
          <div className="pb-6 text-xl font-bold">{dashboardData?.title}</div>
          <div className="flex flex-col gap-2 pb-4">
            <div className="text-lg font-medium">대시보드 이름</div>
            <input
              ref={inputRef}
              className="border-D9D9D9 rounded-lg border border-solid border-gray-D9D9D9 p-4 focus-visible:outline-violet-5534DA"
              defaultValue={dashboardData?.title}
              onChange={handleInputChange}
            />
          </div>
          <ColorSelectBox
            onChangeColor={handleChangeColor}
            usedColor={dashboardData?.color || ''}
          />
        </div>
        <Button
          backgroundColor="purple"
          className="w-full py-3"
          type="submit"
          disabled={!isModified}
        >
          변경
        </Button>
      </form>
    </div>
  );
}
