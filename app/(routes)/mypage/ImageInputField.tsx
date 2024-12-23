import Image from 'next/image';

export default function ImageInputField() {
  return (
    <fieldset>
      <input className="hidden" id="profile" type="file" />
      <label
        htmlFor="profile"
        className="bg-gray-F5F5F5 flex h-24 w-24 items-center justify-center tablet:h-[11.5rem] tablet:w-[11.5rem]"
      >
        <div className="relative h-5 w-5 tablet:h-8 tablet:w-8">
          <Image
            fill
            sizes="100%, 100%, 100%, 100%"
            src="/images/icon/icon-plus-purple.png"
            alt="프로밀 이미지 변경"
          />
        </div>
      </label>
    </fieldset>
  );
}
