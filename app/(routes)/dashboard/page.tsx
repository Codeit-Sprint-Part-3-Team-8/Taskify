'use client';

import dynamic from 'next/dynamic';

const DashBoard = dynamic(() => import('./Dashboard'), { ssr: false });

export default function Page() {
  const initialData = {
    todo: ['1', '2', '3'],
    inProgress: ['4', '5', '6'],
    done: ['7', '8', '9'],
  };

  return (
    <main>
      <DashBoard initialData={initialData} />
    </main>
  );
}
