import React from 'react';


const Expense = ({ income, expense, balance }) => {
  return (
    <div className="expense-cards">
      <div className="card balance-card">
        <h3>Balance</h3>
        <div className="amount">${balance}</div>
      </div>
      <div className="card income-card">
        <h3>Income</h3>
        <div className="amount">${income}</div>
      </div>
      <div className="card expense-card">
        <h3>Expense</h3>
        <div className="amount">${expense}</div>
      </div>
    </div>
  );
};

export default Expense;