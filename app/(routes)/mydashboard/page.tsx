import Sidebar from '@/_components/Sidebar/SideBar';
import DashboardList from './DashboardList';
import MyDashboardNavBar from '@/_components/Navbar/MyDashboardNavBar';

export default function myDashBoardPage() {
  return (
    <div>
      <MyDashboardNavBar />
      <Sidebar />
      <DashboardList />
    </div>
  );
}
