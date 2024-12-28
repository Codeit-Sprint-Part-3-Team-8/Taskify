import Image from 'next/image';

interface ImageInputFieldProps {
  profileImageUrl: string | null;
  onChange: (value: FormData | null) => void;
}

export default function ImageInputField({
  profileImageUrl,
  onChange,
}: ImageInputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('image', files[0], files[0].name);
      onChange(formData);
    }
  };

  return (
    <fieldset>
      <input
        className="hidden"
        id="profile"
        type="file"
        onChange={handleChange}
      />
      <label
        htmlFor="profile"
        className="relative flex h-40 w-40 items-center justify-center rounded-[0.4rem] bg-gray-F5F5F5 tablet:h-[11.5rem] tablet:w-[11.5rem]"
      >
        {profileImageUrl ? (
          <Image
            fill
            sizes="100%, 100%, 100%, 100%"
            src={profileImageUrl}
            alt="프로필 이미지"
          />
        ) : (
          <div className="relative h-5 w-5 tablet:h-8 tablet:w-8">
            <Image
              fill
              sizes="100%, 100%, 100%, 100%"
              src="/images/icon/icon-plus-purple.png"
              alt="프로밀 이미지 변경"
            />
          </div>
        )}
      </label>
    </fieldset>
  );
}
