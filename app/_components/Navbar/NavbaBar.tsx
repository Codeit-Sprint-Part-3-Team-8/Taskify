import MyDashboardNavBar from './MyDashboardNavBar';
import DashboardNavBar from './DashboardNavBar';
import React from 'react';

interface NavBarComponents {
  dashboard: React.ReactNode;
  mydashboard: React.ReactNode;
}

const NAVBAR_COMPONENTS: NavBarComponents = {
  dashboard: <DashboardNavBar />,
  mydashboard: <MyDashboardNavBar />,
};

export default function NavBar({ type }: { type: keyof NavBarComponents }) {
  const NavBarComponent = NAVBAR_COMPONENTS[type] || <div>Default NavBar</div>;
  return <>{NavBarComponent}</>;
}
