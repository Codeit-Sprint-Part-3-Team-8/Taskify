import Image from 'next/image';

export default function CreateColumnButton() {
  return (
    <div className="pc:pt-15 w-full px-3 tablet:py-8 pc:pt-[60px]">
      <div className="flex h-[70px] w-full items-center justify-center gap-3 rounded-md border pc:px-24">
        <p className="text-nowrap text-lg font-bold tablet:text-2lg">
          새로운 컬럼 추가하기
        </p>
        <div className="relative h-5 w-5 tablet:h-[22px] tablet:w-[22px]">
          <Image
            src="/images/icon/ic-plusbtn-purple.svg"
            alt="카드 생성 버튼"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}
