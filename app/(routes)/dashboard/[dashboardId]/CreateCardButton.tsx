import Image from 'next/image';

export default function CreateCardButton() {
  return (
    <div className="flex h-8 w-full items-center justify-center rounded-md border px-24 py-1.5 tablet:h-10 tablet:py-2">
      <div className="relative h-5 w-5 tablet:h-[22px] tablet:w-[22px]">
        <Image
          src="/images/icon/ic-plusbtn-purple.svg"
          alt="카드 생성 버튼"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
