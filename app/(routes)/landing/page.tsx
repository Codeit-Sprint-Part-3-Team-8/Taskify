'use client';

import { RefObject, Suspense, useRef, useState } from 'react';
import Section from './Section';
import Header from './Header';

import Image from 'next/image';
import LandingDashboard from '@images/contents/landing-dashboard.png';
import LandingTodolist from '@images/contents/landing-todolist.png';
import LandingSection1 from '@images/contents/landing-section1.png';
import LandingSection2 from '@images/contents/landing-section2.png';
import LandingSection3 from '@images/contents/landing-section3.png';
import { montserrat } from '@/_styles/fonts';
import Link from 'next/link';
import ContentBox from './ContentBox';
import useResize from '@/utils/useResize';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import Navigate from '@/_components/Auth/Navigate';

export default function LandingPage() {
  const sectionRefs: RefObject<HTMLDivElement | null>[] = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isScrolling = useRef(false);
  const screenType = useResize();
  const lastTouchY = useRef(0);
  const { user, loading } = useAuth();

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 400);
    if (Math.abs(e.deltaY) > 1) {
      if (e.deltaY > 0) {
        scrollToNextSection();
        return;
      } else {
        scrollToPrevSection();
        return;
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastTouchY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = lastTouchY.current - e.touches[0].clientY;

    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0) {
        scrollToNextSection();
      } else {
        scrollToPrevSection();
      }
      lastTouchY.current = e.touches[0].clientY;
    }
  };

  const scrollToNextSection = () => {
    scrollToSection(currentSectionIndex + 1);
  };

  const scrollToPrevSection = () => {
    scrollToSection(currentSectionIndex - 1);
  };

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionRefs.length) {
      setCurrentSectionIndex(index);
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading.auth) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      {user ? (
        <Navigate />
      ) : (
        <>
          <Header />
          <div
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="h-screen touch-none overflow-hidden"
          >
            <Section
              ref={sectionRefs[0]}
              fromColorClass="bg-black-000000"
              flexDirection="flex-col"
            >
              <div className="relative flex h-screen w-full flex-col items-center justify-center">
                <div className="absolute inset-0 z-0 bg-[url('/images/contents/main.png')] bg-cover bg-center opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center pb-28 pt-6 text-center text-white tablet:pt-12 tablet:text-[3.5rem] pc:text-6xl">
                  <h1 className="pb-28 pt-6 text-center text-4xl font-bold text-white tablet:pt-12 tablet:text-[3.5rem] pc:text-6xl">
                    새로운 일정 관리
                    <span
                      className={`${montserrat.variable} mt-2 block font-montserrat text-[2.6rem] tablet:inline tablet:pl-7 tablet:text-[4.3rem]`}
                    >
                      Taskify
                    </span>
                  </h1>
                  <Link href="/login">
                    <button className="rounded-lg bg-violet-5534DA px-[101px] py-4 text-2lg font-semibold text-white">
                      로그인하기
                    </button>
                  </Link>
                </div>
              </div>
            </Section>
            <Section
              ref={sectionRefs[1]}
              fromColorClass="bg-black-171717"
              flexDirection="flex-col"
            >
              <div className="mt-20 flex w-full flex-col items-center">
                <div className="text-center pc:pl-14 pc:text-left">
                  <div className="gap-14 pc:flex pc:justify-between">
                    <div className="">
                      <div className="pb-10 text-[1.3rem] text-gray-9FA6B2">
                        Point 1
                      </div>
                      <h2 className="pb-7 text-5xl text-[2.3rem] font-bold text-white">
                        일의 우선순위를
                        <br />
                        관리하세요
                      </h2>
                      <div className="pb-4 text-white">
                        바쁜 일정에서 중요한 일을 놓치지 않아아죠! <br />
                        해야할일, 진행중, 완료를 나누어 관리 할수있어요
                        <br />
                        일상을 알차게 보내기 위해 Taskify와 함께하세요
                      </div>
                    </div>
                    <Image
                      src={LandingDashboard}
                      alt="대쉬보드이미지"
                      width={700}
                      height={500}
                      className="w-[300] rounded-3xl object-cover px-7 tablet:w-[500px] pc:w-[800px]"
                    />
                  </div>
                </div>
              </div>
            </Section>
            <Section
              ref={sectionRefs[2]}
              fromColorClass="bg-black-171717"
              flexDirection="flex-col"
            >
              <div className="mt-20 flex w-full flex-col items-center">
                <div className="text-center pc:pl-14 pc:text-left">
                  <div className="flex flex-col items-center tablet:flex-row tablet:justify-between">
                    <div className="">
                      <div className="pb-10 text-[1.3rem] text-gray-9FA6B2 tablet:pt-5">
                        Point 2
                      </div>
                      <h2 className="pb-7 text-5xl text-[2.3rem] font-bold text-white">
                        해야 할 일을
                        <br />
                        등록하세요
                      </h2>
                      <div className="text-nowrap pb-4 text-white">
                        해야할 일을 등록하고, 중요한 일을 관리하세요.
                        <br />
                        Taskify와 함께 더욱 효율적인 일정관리를 경험해보세요.
                      </div>
                    </div>
                    <Image
                      src={LandingTodolist}
                      alt="대쉬보드이미지"
                      width={700}
                      height={500}
                      className="h-[350px] w-[300px] object-contain px-7 tablet:h-[500px] tablet:w-[500px]"
                    />
                  </div>
                </div>
              </div>
            </Section>
            {screenType === 'desktop' ? (
              <>
                <Section
                  ref={sectionRefs[3]}
                  fromColorClass="bg-black-171717"
                  flexDirection="flex-col pc:flex-col"
                >
                  <div className="pb-9 pt-20 text-center text-[1.75rem] font-bold text-white pc:text-left">
                    생산성을 높이는 다양한 설정 ⚡
                  </div>
                  <div className="flex gap-10 tablet:gap-12 pc:flex-row pc:gap-8">
                    <ContentBox
                      title="대시보드 설정"
                      description="대시보드 사진과 이름을 변경할 수 있어요."
                      imageSrc={LandingSection1}
                      imageAlt="대시보드설정사진"
                    />
                    <ContentBox
                      title="초대 기능"
                      description="새로운 팀원을 초대할 수 있어요."
                      imageSrc={LandingSection2}
                      imageAlt="초대사진"
                    />
                    <ContentBox
                      title="구성원 관리 기능"
                      description="구성원을 초대하고 내보낼 수 있어요."
                      imageSrc={LandingSection3}
                      imageAlt="구성원사진"
                    />
                  </div>
                </Section>
              </>
            ) : (
              <>
                <Section
                  ref={sectionRefs[3]}
                  fromColorClass="bg-black-171717"
                  flexDirection="flex-col pc:flex-col"
                >
                  <div className="pb-9 pt-20 text-center text-[1.75rem] font-bold text-white pc:text-left">
                    구성원 관리하는 대시보드 생성 👥
                  </div>
                  <div className="flex flex-row gap-10">
                    <ContentBox
                      title="대시보드 설정"
                      description="대시보드 사진과 이름을 변경할 수 있어요."
                      imageSrc={LandingSection1}
                      imageAlt="대시보드설정사진"
                    />
                  </div>
                </Section>
                <Section
                  ref={sectionRefs[4]}
                  fromColorClass="bg-black-171717"
                  flexDirection="flex-col pc:flex-col"
                >
                  <div className="pb-9 pt-20 text-center text-[1.75rem] font-bold text-white pc:text-left">
                    구성원을 초대하는 초대기능 ⚡
                  </div>
                  <div className="flex gap-10 tablet:gap-12 pc:flex-row pc:gap-8">
                    <ContentBox
                      title="초대"
                      description="새로운 팀원을 초대할 수 있어요."
                      imageSrc={LandingSection2}
                      imageAlt="초대사진"
                    />
                  </div>
                </Section>
                <Section
                  ref={sectionRefs[5]}
                  fromColorClass="bg-black-171717"
                  flexDirection="flex-col pc:flex-col"
                >
                  <div className="pb-9 pt-20 text-center text-[1.75rem] font-bold text-white pc:text-left">
                    구성원을 관리하는 삭제기능 ⚡
                  </div>
                  <div className="flex gap-10 tablet:gap-12 pc:flex-row pc:gap-8">
                    <ContentBox
                      title="구성원"
                      description="구성원을 초대하고 내보낼 수 있어요."
                      imageSrc={LandingSection3}
                      imageAlt="구성원사진"
                    />
                  </div>
                </Section>
                <Section
                  ref={sectionRefs[6]}
                  fromColorClass="bg-black-000000"
                  flexDirection="flex-col pc:flex-col"
                >
                  <Footer />
                </Section>
              </>
            )}
          </div>
          {screenType === 'desktop' && <Footer />}
        </>
      )}
    </Suspense>
  );
}
