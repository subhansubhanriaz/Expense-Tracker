
import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const Wallets = () => {
  const { transactions } = useContext(ExpenseContext);

  const walletData = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (!acc[t.wallet]) acc[t.wallet] = 0;
      acc[t.wallet] += t.type === "income"
        ? Number(t.amount)
        : -Number(t.amount);
      return acc;
    }, {});
  }, [transactions]);

  const totalBalance = Object.values(walletData).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <div className="page-container">
      <h2>Wallet Overview</h2>

      <div className="wallet-grid">
        {Object.entries(walletData).map(([name, balance]) => (
          <div className="wallet-card" key={name}>
            <h4>{name}</h4>
            {/* <p>Rs {balance}</p> */}
            <p>{currencySymbol()} {convertCurrency(balance)}</p>
          </div>
        ))}
      </div>

      <div className="summary-card">
        <h3>Total Balance</h3>
        <p>Rs {totalBalance}</p>
      </div>
    </div>
  );
};

export default Wallets;