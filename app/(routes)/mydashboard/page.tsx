import Sidebar from '@/_components/Sidebar/SideBar';
import DashboardList from './DashboardList';
import NavBar from '@/_components/Navbar/NavBar';

export default function myDashBoardPage() {
  return (
    <div>
      <NavBar type="mydashboard" />
      <Sidebar />
      <DashboardList />
    </div>
  );
}
