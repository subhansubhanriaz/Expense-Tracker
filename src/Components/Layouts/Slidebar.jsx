import React from "react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdPieChart,
  MdBarChart,
  MdSettings,
} from "react-icons/md";

const Sidebar = ({ activePage, setActivePage }) => {

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "Wallets", icon: <MdAccountBalanceWallet /> },
    { name: "Transactions", icon: <MdAttachMoney /> },
    { name: "Budget", icon: <MdPieChart /> },
    { name: "Report", icon: <MdBarChart /> },
    { name: "Settings", icon: <MdSettings /> },
  ];

  return (  
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activePage === item.name ? "active" : ""}
            onClick={() => setActivePage(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
