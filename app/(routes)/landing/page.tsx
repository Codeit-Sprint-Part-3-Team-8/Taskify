'use client';
import Image from 'next/image';
import mainImage from '@images/contents/main.png';
import landing1 from '@images/contents/landing1.png';
import landing2 from '@images/contents/landing2.png';
import landing3 from '@images/contents/landing3.png';
import landing4 from '@images/contents/landing4.png';
import landing5 from '@images/contents/landing5.png';
import { montserrat } from '@/fonts';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import ContentBox from './ContentBox';

export default function LandingPage() {
  return (
    <>
      <div className="bg-black-000000 pb-24 tablet:pb-0">
        <Header />
        <div className="justify flex flex-col items-center pb-40 pt-24">
          <div className="relative flex w-full items-center justify-center px-11 tablet:px-24">
            <Image src={mainImage} width={722} height={422} alt="메인이미지" />
          </div>
          <h1 className="pb-28 pt-6 text-center text-4xl font-bold text-white tablet:pt-12 tablet:text-[3.5rem] pc:text-6xl">
            새로운 일정 관리
            <span
              className={`${montserrat.variable} font-montserrat mt-2 block text-[2.6rem] text-violet-5534DA tablet:inline tablet:pl-7 tablet:text-[4.3rem]`}
            >
              Taskify
            </span>
          </h1>
          <Link href="/login">
            <button className="text-2lg rounded-lg bg-violet-5534DA px-[101px] py-4 font-medium text-white">
              로그인하기
            </button>
          </Link>
          <div className="flex w-full items-center justify-center px-4 tablet:px-10">
            <section className="mt-44 h-full w-full bg-black-171717 pc:h-[37rem] pc:w-[75rem]">
              <div className="flex flex-col justify-between gap-56 pc:flex-row pc:gap-0">
                <div className="pt-28 text-center tablet:pl-14 tablet:text-left">
                  <div className="pb-24 text-[1.3rem] text-gray-9FA6B2">
                    Point 1
                  </div>
                  <h2 className="text-5xl font-bold text-white mobile:text-[2.3rem]">
                    일의 우선순위를
                    <br />
                    관리하세요
                  </h2>
                </div>
                <div className="flex justify-end">
                  <div className="relative h-[15rem] w-[18rem] tablet:h-[27rem] tablet:w-[32rem]">
                    <Image
                      className="pc:pt-[10rem]"
                      src={landing1}
                      width={594}
                      height={497}
                      alt="대쉬보드이미지"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="flex w-full items-center justify-center px-4 tablet:px-10">
            <section className="mt-44 w-full bg-black-171717 pc:h-[37rem] pc:w-[75rem]">
              <div className="flex flex-col-reverse pc:flex-row">
                <div className="relative flex items-center justify-center pt-[5.6rem] pc:pl-24">
                  <Image
                    className=""
                    src={landing2}
                    width={436}
                    height={502}
                    alt="할일카드"
                  />
                </div>
                <div className="pt-28 text-center tablet:pl-14 tablet:text-left">
                  <div className="pb-24 text-[1.3rem] text-gray-9FA6B2">
                    Point 2
                  </div>
                  <h2 className="text-5xl font-bold text-white mobile:text-[2.3rem]">
                    해야 할 일을
                    <br />
                    등록하세요
                  </h2>
                </div>
              </div>
            </section>
          </div>
          <section>
            <div className="pb-9 pt-20 text-center text-[1.75rem] font-bold text-white pc:text-left">
              생산성을 높이는 다양한 설정 ⚡
            </div>
            <div className="flex flex-col gap-10 tablet:gap-12 pc:flex-row pc:gap-8">
              <ContentBox
                title="대시보드 설정"
                description="대시보드 사진과 이름을 변경할 수 있어요."
                imageSrc={landing3}
                imageAlt="대시보드설정사진"
              />
              <ContentBox
                title="초대"
                description="새로운 팀원을 초대할 수 있어요."
                imageSrc={landing4}
                imageAlt="초대사진"
              />
              <ContentBox
                title="구성원"
                description="구성원을 초대하고 내보낼 수 있어요."
                imageSrc={landing5}
                imageAlt="구성원사진"
              />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
