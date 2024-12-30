import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createColumnImage } from '@/api/columns.api';

interface ImageUploadProps {
  imageUrl?: string | null;
  columnId: number | undefined;
  onImageChange: (url: string | undefined) => void;
  isLoading?: boolean;
}

export default function ImageUpload({
  imageUrl,
  columnId,
  onImageChange,
  isLoading,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && columnId) {
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }

      const previewUrl = URL.createObjectURL(file);
      onImageChange(previewUrl);

      try {
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file, file.name);

        const response = await createColumnImage({ columnId, image: formData });

        onImageChange(response.imageUrl);
      } catch {
        alert('이미지 업로드 중 문제가 발생했습니다. 다시 시도해주세요.');
        onImageChange(undefined);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    onImageChange(undefined);
  };

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-[100px] w-[100px]">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="Selected image"
              fill
              className="rounded-xl object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md"
              disabled={isLoading || uploading}
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <label className="hover:border-purple-6E3FF3 flex h-full w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-D9D9D9">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading || uploading}
            />
            <span className="text-4xl text-violet-5534DA">+</span>
          </label>
        )}
      </div>
    </div>
  );
}
