'use client';
import React, { useEffect, useRef, useState } from 'react';
import ColorSelectBox from './ColorSelectBox';
import Button from '@/_components/Button/Button';
import useAsync from '@/_hooks/useAsync';
import { DashboardType } from '@/_types/dashboards.type';
import { updateDashboard } from '@/api/dashboards.api';

interface ModifyBoxProps {
  modifyData: DashboardType | null;
}

export default function ModifyBox({ modifyData }: ModifyBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colorData, setColorData] = useState<string>(modifyData?.color || '');
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    modifyData,
  );
  const { data: asyncData, excute: updateDashBoardAsync } =
    useAsync(updateDashboard);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) {
      return;
    }
    const param = {
      dashboardId: modifyData?.id || 0,
      title: inputRef.current!.value,
      color: colorData,
    };
    await updateDashBoardAsync(param);
  };

  const handleChangeColor = (color: string) => {
    if (color !== colorData) {
      setColorData(color);
    }
  };

  useEffect(() => {
    if (modifyData) {
      setDashboardData(modifyData);
      setColorData(modifyData.color);
    }
  }, [modifyData]);

  useEffect(() => {
    if (asyncData) {
      setDashboardData(asyncData);
      setColorData(asyncData.color);
    }
  }, [asyncData]);

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
              className="border-D9D9D9 rounded-lg border border-solid border-gray-D9D9D9 p-4"
              defaultValue={dashboardData?.title}
            />
          </div>
          <ColorSelectBox
            onChangeColor={handleChangeColor}
            usedColor={dashboardData?.color || ''}
          />
        </div>
        <Button backgroundColor="purple" className="w-full py-3" type="submit">
          변경
        </Button>
      </form>
    </div>
  );
}
