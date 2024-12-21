'use client';

import { getDashBoardById } from '@/api/dashboard';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashBoard = dynamic(() => import('./Dashboard'), { ssr: false });

export interface dashBoardType {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export default function DashBoardPage() {
  const { id } = useParams();
  const [dashBoard, setDashBoard] = useState<dashBoardType>({
    id: 0,
    title: '',
    color: '',
    userId: 0,
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
  });

  useEffect(() => {
    const fetchDashBoard = async () => {
      try {
        const data = await getDashBoardById({ id });

        setDashBoard(data);
      } catch (error) {
        console.log('ERROR fetching DashBoard', error);
      }
    };

    fetchDashBoard();
  }, [id]);

  return (
    <main>
      <DashBoard dashBoard={dashBoard} />
    </main>
  );
}
