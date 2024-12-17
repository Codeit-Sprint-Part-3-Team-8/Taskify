import Image from 'next/image';
import mainImage from '@images/main.png';

export default function Home() {
  return (
    <>
      <div className="bg-black-000000">
        <div className="justify flex flex-col items-center">
          <Image src={mainImage} width={722} height={422} alt="메인이미지" />
          <h1 className="">새로운 일정 관리</h1>
        </div>
      </div>
    </>
  );
}
