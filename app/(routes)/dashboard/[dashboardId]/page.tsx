'use client';

import { DashboardType } from '@/_types/dashboards.type';
import { getDashboard } from '@/api/dashboards.api';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashBoard = dynamic(() => import('./Dashboard'), { ssr: false });

export default function DashBoardPage() {
  const { dashboardId } = useParams();
  const [dashBoard, setDashBoard] = useState<DashboardType>({
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
      const numericDashboardId = Number(dashboardId);
      try {
        console.log(dashboardId);
        const data = await getDashboard({ dashboardId: numericDashboardId });

        setDashBoard(data);
      } catch (error) {
        console.log('ERROR fetching DashBoard', error);
      }
    };

    fetchDashBoard();
  }, [dashboardId]);

  return (
    <main>
      <DashBoard dashBoard={dashBoard} />
    </main>
  );
}
