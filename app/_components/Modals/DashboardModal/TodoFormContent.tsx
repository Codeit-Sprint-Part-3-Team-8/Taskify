import React, { useState } from 'react';
import icDropdownArrow from '@images/icon/ic-dropdown-arrow.svg';
import { Calendar } from '@/_components/Calendar/Calendar';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import DropdownMenu from '@/_components/Dropdown/Dropdown';
import ModalInput from '@/_components/Modals/ModalInput';
import ImageUpload from '@/_components/Modals/ImageUpload';
import { MemberType } from '@/_types/members.type';
import { KeyboardEvent } from 'react';
import { FormDataValue } from '@/_types/todo-prop.type';
import { ColumnData } from '@/(routes)/dashboard/[dashboardId]/Dashboard';

interface TodoFormContentProps {
  formData: {
    columnId?: number;
    columnTitle?: string;
    assigneeUserId?: number | null;
    title: string;
    description: string;
    dueDate?: string | null;
    tags: string[];
    imageUrl?: string | null;
  };
  onChange: (field: string, value: FormDataValue) => void;
  columns?: Array<{ columnId: number; columnTitle: string }>;
  currentColumn: ColumnData;
  members: MemberType[];
  isLoading: boolean;
}

export function TodoFormContent({
  formData,
  onChange,
  columns,
  currentColumn,
  members,
  isLoading,
}: TodoFormContentProps) {
  const [tagInput, setTagInput] = useState('');
  const [assigneeNickname, setAssigneeNickname] = useState('');

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        onChange('tags', [...formData.tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(
      'tags',
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex gap-4">
        {columns && (
          <div className="flex w-full flex-col gap-2">
            <label className="text-lg font-medium text-black-333236">
              상태
            </label>
            <DropdownMenu
              buttonClassName="flex h-12 w-full items-center justify-between rounded-xl border border-gray-D9D9D9 px-4 text-left hover:border-gray-400 transition-colors"
              menuClassName="w-full absolute left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg"
              trigger={
                <>
                  <span className="text-[0.9375rem] text-gray-9FA6B2">
                    {formData.columnTitle}
                  </span>
                  <Image
                    src={icDropdownArrow}
                    alt="dropdown arrow"
                    width={16}
                    height={16}
                    className="opacity-60"
                  />
                </>
              }
            >
              <div className="py-1">
                {columns.map((column) => (
                  <button
                    key={column.columnId}
                    className="w-full px-4 py-2.5 text-left text-[0.9375rem] hover:bg-gray-50"
                    onClick={() => {
                      onChange('columnId', column.columnId);
                      onChange('columnTitle', column.columnTitle);
                    }}
                  >
                    {column.columnTitle}
                  </button>
                ))}
              </div>
            </DropdownMenu>
          </div>
        )}

        <div className="flex w-full flex-col gap-2">
          <label className="text-lg font-medium text-black-333236">
            담당자
          </label>
          <DropdownMenu
            buttonClassName="flex h-12 w-full items-center justify-between rounded-xl border border-gray-D9D9D9 px-4 text-left hover:border-gray-400 transition-colors"
            menuClassName="w-full absolute left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg"
            trigger={
              <>
                <span className="text-[0.9375rem] text-gray-9FA6B2">
                  {assigneeNickname || '담당자를 선택해 주세요'}
                </span>
                <Image
                  src={icDropdownArrow}
                  alt="dropdown arrow"
                  width={16}
                  height={16}
                  className="opacity-60"
                />
              </>
            }
          >
            <div className="py-1">
              {members.map((member) => (
                <button
                  key={member.id}
                  className="w-full px-4 py-2.5 text-left text-[0.9375rem] hover:bg-gray-50"
                  onClick={() => {
                    onChange('assigneeUserId', member.userId);
                    setAssigneeNickname(member.nickname);
                  }}
                >
                  {member.nickname}
                </button>
              ))}
            </div>
          </DropdownMenu>
        </div>
      </div>

      <ModalInput
        name="제목"
        label="제목 *"
        placeholder="제목을 입력해 주세요"
        value={formData.title}
        onChange={(e) => onChange('title', e.target.value)}
        disabled={isLoading}
        className="h-12 rounded-xl border border-gray-D9D9D9 px-4 text-[0.9375rem] placeholder:text-gray-9FA6B2 focus:border-gray-400"
      />

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-black-333236">설명 *</label>
        <textarea
          name="설명"
          placeholder="설명을 입력해 주세요"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          disabled={isLoading}
          className="h-32 resize-none rounded-xl border border-gray-D9D9D9 px-4 py-3 text-[0.9375rem] placeholder:text-gray-9FA6B2 focus:border-gray-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-black-333236">마감일</label>
        <DropdownMenu
          buttonClassName="flex h-12 w-full items-center gap-3 rounded-xl border border-gray-D9D9D9 px-4 text-left hover:border-gray-400 transition-colors"
          menuClassName="w-[18rem] absolute left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-whiteshadow-lg"
          trigger={
            <>
              <CalendarIcon className="h-5 w-5 text-gray-9FA6B2" />
              <span className="text-[0.9375rem] text-gray-9FA6B2">
                {formData.dueDate ? formData.dueDate : '날짜를 선택해 주세요'}
              </span>
            </>
          }
        >
          <Calendar
            mode="single"
            selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
            onSelect={(date) =>
              onChange(
                'dueDate',
                date ? format(new Date(date), 'yyyy-MM-dd HH:mm') : undefined,
              )
            }
            className="rounded-lg border"
          />
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-black-333236">태그</label>
        <input
          type="text"
          placeholder="입력 후 Enter를 눌러주세요"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          disabled={isLoading}
          className="h-12 rounded-[0.875rem] border border-gray-D9D9D9 px-4 text-[0.9375rem] placeholder:text-gray-9FA6B2 focus:border-gray-400 focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1.5 rounded-[0.875rem] bg-gray-100/80 px-3 py-1.5 text-[0.9375rem]"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-black-333236">이미지</label>
        <ImageUpload
          columnId={currentColumn.id}
          imageUrl={formData.imageUrl}
          onImageChange={(url) => onChange('imageUrl', url)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
