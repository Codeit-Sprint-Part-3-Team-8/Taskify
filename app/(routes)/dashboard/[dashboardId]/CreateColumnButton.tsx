import Image from 'next/image';

export default function CreateColumnButton() {
  return (
    <div className="w-full px-3 mobile:pb-8 mobile:pt-4 pc:pt-[58px]">
      <div className="flex h-[70px] w-full items-center justify-center gap-3 rounded-md border px-24">
        <p className="text-nowrap text-2lg font-bold">새로운 컬럼 추가하기</p>
        <Image
          src="/images/icon/ic-plusbtn-purple.svg"
          alt="카드 생성 버튼"
          width={22}
          height={24}
        />
      </div>
    </div>
  );
}
