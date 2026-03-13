
import React, { createContext, useState, useMemo, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

  const { currentUser } = useContext(AuthContext);

  // All transactions
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("expenseTrackerState");
    return saved ? JSON.parse(saved) : [];
  });

  // Only current user transactions
  const userTransactions = useMemo(() => {
    if (!currentUser) return [];
    return transactions.filter(t => t.userId === currentUser.id);
  }, [transactions, currentUser]);

  // Categories
  const categories = [...new Set(
    userTransactions.map(t => t.category).filter(Boolean)
  )];

  // Wallets
  const wallets = [...new Set(
    userTransactions.map(t => t.wallet).filter(Boolean)
  )];

  // Balance calculation
  const { income, expense, balance } = useMemo(() => {

    let incomeTotal = 0;
    let expenseTotal = 0;

    userTransactions.forEach((t) => {
      if (t.type === "income") incomeTotal += t.amount;
      else expenseTotal += t.amount;
    });

    return {
      income: incomeTotal,
      expense: expenseTotal,
      balance: incomeTotal - expenseTotal
    };

  }, [userTransactions]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("expenseTrackerState", JSON.stringify(transactions));
  }, [transactions]);

  // ✅ FIXED: Add transaction with login check
  const addTransaction = (item) => {

    if (!currentUser) {
      alert("⚠ Please sign in first");
      return;
    }

    const newTransaction = {
      ...item,
      id: Date.now(),
      userId: currentUser.id
    };

    setTransactions(prev => [...prev, newTransaction]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions: userTransactions,
        addTransaction,
        deleteTransaction,
        income,
        expense,
        balance,
        categories,
        wallets
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};