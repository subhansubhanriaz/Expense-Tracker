import React, { useState, useContext, useEffect } from "react";
import { ExpenseProvider, ExpenseContext } from "./context/ExpenseContext";

import ExpenseTracker from "./Components/ExpenseTracker";
import Header from "./Components/Layouts/Header";
import Sidebar from "./Components/Layouts/Slidebar";

import Budget from "./Components/Dashboard/Budget";
import Report from "./Components/Dashboard/Report";
import Settings from "./Components/Dashboard/Settings";
import Wallets from "./Components/Dashboard/Wallets";

import SignInSignUpModal from "./Components/Modals/SignInSignUpModal";
import NotificationPage from "./Components/Modals/NotificationPage";

import "./Components/Layouts/Layouts.css";
import "./Components/Modals/Modals.css";

const AppContent = () => {

  const { transactions } = useContext(ExpenseContext);

  const [activePage, setActivePage] = useState("Dashboard");

  const [showAuth, setShowAuth] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(()=>{

   if(transactions.length > 0){

    const last = transactions[transactions.length-1];

    alert(`💰 New transaction added Rs ${last.amount}`);

   }

  },[transactions]);

  const renderPage = () => {

    switch(activePage){

      case "Wallets":
        return <Wallets/>

      case "Budget":
        return <Budget/>

      case "Report":
        return <Report/>

      case "Settings":
        return <Settings/>

      default:
        return <ExpenseTracker/>

    }

  }

  return (

    <div className="app-layout">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">

        <Header
          onUserClick={()=>setShowAuth(true)}
          onNotificationClick={()=>setShowNotification(true)}
        />

        {renderPage()}

        {showAuth && (
          <SignInSignUpModal
            onClose={()=>setShowAuth(false)}
          />
        )}

        {showNotification && (
          <NotificationPage
            onClose={()=>setShowNotification(false)}
          />
        )}

      </div>

    </div>

  );

};

const App = () => {
  return(
    <ExpenseProvider>
      <AppContent/>
    </ExpenseProvider>
  )
}

export default App;