'use client';

import { useEffect, useState } from 'react';
import NavBar from '@/_components/Navbar/NavBar';
import Sidebar from '@/_components/Sidebar/SideBar';
import DashboardList from './DashboardList';
import InvitationsDashboard from './InvitationsDashboard';
import useAsync from '@/_hooks/useAsync';
import { getDashboardList } from '@/api/dashboards.api';
import CreateDashboardModal from './CreateDashboardModal';
import { DashboardType } from '@/_types/dashboards.type';

export default function MyDashboardPage() {
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { excute: fetchDashboards, loading } = useAsync(
    async (page: number) => {
      const data = await getDashboardList({
        navigationMethod: 'pagination',
        page,
        size: 5,
      });
      setDashboardList(data.dashboards);
      setTotalPages(Math.ceil(data.totalCount / 5));
    },
  );

  useEffect(() => {
    fetchDashboards(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenCreateModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
  };

  const handleAcceptInvitation = () => {
    fetchDashboards(currentPage);
  };

  return (
    <div>
      <NavBar type="mydashboard" />
      <Sidebar />
      <DashboardList
        dashboardList={dashboardList}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onOpenCreateModal={handleOpenCreateModal}
        isLoading={loading}
      />
      <InvitationsDashboard onAcceptInvitation={handleAcceptInvitation} />
      {isModalOpen && <CreateDashboardModal onClose={handleCloseCreateModal} />}
    </div>
  );
}
