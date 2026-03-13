import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import TransictionForm from "./Modals/TransictionForm";
import TransactionHistory from "./Dashboard/TransactionHistory"; // ✅ FIXED
import BalanceCard from "./Dashboard/BalanceCard"; // ✅ FIXED
import PieChart from "./charts/PieChart";



const categories = ["Salary", "Grocery", "Food", "Rent", "Utilities"];
const wallets = ["Cash", "Bank", "Credit Card"];

const ExpenseTracker = () => {
  const { transactions, addTransaction, deleteTransaction } = useContext(ExpenseContext);

  return (
    <div>
      <BalanceCard />
      <PieChart />
      <TransictionForm
        onNewTransaction={addTransaction}
        categories={categories}
        wallets={wallets}
      />
      <TransactionHistory transactions={transactions} onDeleteTransaction={deleteTransaction} />
    </div>
  );
};

export default ExpenseTracker;