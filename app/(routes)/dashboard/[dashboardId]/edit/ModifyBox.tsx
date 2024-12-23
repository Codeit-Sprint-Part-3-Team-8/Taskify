'use client';
import React, { useEffect, useRef, useState } from 'react';
import ColorSelectBox from './ColorSelectBox';
import Button from '@/_components/Button/Button';
import useAsync from '@/_hooks/useAsync';
import { updateDashboardId, UpdateDashboardIdParams } from '@/api/dashboard';
import { DashboardType } from '@/_types/dashboards.type';

interface ModifyBoxProps {
  modifyData: DashboardType | null;
}

export default function ModifyBox({ modifyData }: ModifyBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colorData, setColorData] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    modifyData,
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { data: asyncData, excute: updateDashBoardAsync } = useAsync(
    (params: UpdateDashboardIdParams) =>
      updateDashboardId(modifyData?.id || 0, params),
  );

  useEffect(() => {
    if (modifyData) {
      setDashboardData(modifyData);
      setColorData(modifyData.color);
    }
  }, [modifyData]);

  const { title, color } = dashboardData || {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) {
      return;
    }
    const param = { title: inputRef.current!.value, color: colorData };
    await updateDashBoardAsync(param);
  };

  const handleInputChange = () => {
    if (inputRef.current?.value.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    if (asyncData) {
      setDashboardData(asyncData);
    }
  }, [asyncData]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-3 bg-white px-4 py-5 tablet:w-[34rem] tablet:py-8 pc:w-[38rem]">
      {/* 박스 */}
      <form onSubmit={handleSubmit}>
        <div className="pb-10">
          <div className="pb-6 text-xl font-bold">{title}</div>
          <div className="flex flex-col gap-2 pb-4">
            <div className="text-lg font-medium">대시보드 이름</div>
            <input
              onChange={handleInputChange}
              ref={inputRef}
              className="border-D9D9D9 rounded-lg border border-solid border-gray-D9D9D9 p-4"
              defaultValue={title}
            />
          </div>
          <ColorSelectBox
            onChangeColor={(color) => setColorData(color)}
            usedColor={color || ''}
          />
        </div>
        <Button
          backgroundColor="purple"
          className="w-full py-3"
          type="submit"
          disabled={isButtonDisabled}
        >
          변경
        </Button>
      </form>
    </div>
  );
}
