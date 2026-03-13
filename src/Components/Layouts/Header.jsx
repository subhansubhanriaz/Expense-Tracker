import React, { useContext } from "react";
import "./Header.css";
import { MdNotifications, MdAccountCircle } from "react-icons/md";
import { ExpenseContext } from "../../context/ExpenseContext";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const Header = ({ onUserClick, onNotificationClick }) => {

  // Context data
  const { balance, transactions } = useContext(ExpenseContext);

  return (
    <header className="header">
      <div className="header-logo">MyExpenseTracker</div>

      <div className="header-balance">
        <span>Total Balance</span>
        {/* <h2>${balance}</h2> */}
        <h2>{currencySymbol()} {convertCurrency(balance)}</h2>
      </div>

      <div className="header-profile">

        {/* Notification Section */}
        <div className="notification-wrapper">

          <MdNotifications
            className="header-icon"
            size={28}
            onClick={onNotificationClick}
          />

          {/* Notification Badge */}
          <span className="notification-badge">
            {transactions.length}
          </span>

        </div>

        {/* User Icon */}
        <MdAccountCircle
          className="header-avatar"
          size={30}
          onClick={onUserClick}
        />

      </div>
    </header>
  );
};

export default Header;