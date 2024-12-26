import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  imageUrl?: string;
  onImageChange: (url: string | undefined) => void;
  isLoading?: boolean;
}

export default function ImageUpload({
  imageUrl,
  onImageChange,
  isLoading,
}: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      onImageChange(newImageUrl);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="select-none text-black-333236">이미지</label>
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <span className="text-4xl text-violet-5534DA">+</span>
          </label>
        )}
      </div>
    </div>
  );
}
