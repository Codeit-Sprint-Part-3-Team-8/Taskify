import Sidebar from '@/_components/Sidebar/SideBar';
import DashboardList from './DashboardList';
import NavBar from '@/_components/Navbar/NavBar';
import InvitationsDashboard from './InvitationsDashboard';

export default function myDashBoardPage() {
  return (
    <div>
      <NavBar type="mydashboard" />
      <Sidebar />
      <DashboardList />
      <InvitationsDashboard />
    </div>
  );
}
