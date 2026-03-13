// import React, { useContext, useMemo } from "react";
// import { ExpenseContext } from "../../context/ExpenseContext";
// import { convertCurrency, currencySymbol } from "../../utils/Currency";

// const Report = () => {
//   const { transactions } = useContext(ExpenseContext);

//   const income = useMemo(() =>
//     transactions.filter(t => t.type === "income")
//       .reduce((acc, t) => acc + Number(t.amount), 0),
//   [transactions]);

//   const expense = useMemo(() =>
//     transactions.filter(t => t.type === "expense")
//       .reduce((acc, t) => acc + Number(t.amount), 0),
//   [transactions]);

//   const savingsRate = income > 0
//     ? ((income - expense) / income) * 100
//     : 0;

//   return (
//     <div className="page-container">
//       <h2>Financial Report</h2>

//       <div className="report-grid">
//         <div className="card income-card">
//           <h4>Total Income</h4>
//           <p>Rs {income}</p>
//         </div>

//         <div className="card expense-card">
//           <h4>Total Expense</h4>
//           <p>Rs {expense}</p>
//         </div>

//         <div className="card balance-card">
//           <h4>Savings Rate</h4>
//           <p>{savingsRate.toFixed(1)}%</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Report;
import React, { useContext, useMemo } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const Report = () => {

  const { transactions } = useContext(ExpenseContext);

  // Total Income
  const income = useMemo(() =>
    transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount), 0),
  [transactions]);

  // Total Expense
  const expense = useMemo(() =>
    transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount), 0),
  [transactions]);

  // Savings %
  const savingsRate = income > 0
    ? ((income - expense) / income) * 100
    : 0;

  return (

    <div className="page-container">

      <h2>Financial Report</h2>

      <div className="report-grid">

        {/* Income Card */}
        <div className="card income-card">

          <h4>Total Income</h4>

          <p>
            {currencySymbol()} {convertCurrency(income)}
          </p>

        </div>

        {/* Expense Card */}
        <div className="card expense-card">

          <h4>Total Expense</h4>

          <p>
            {currencySymbol()} {convertCurrency(expense)}
          </p>

        </div>

        {/* Savings Card */}
        <div className="card balance-card">

          <h4>Savings Rate</h4>

          <p>
            {savingsRate.toFixed(1)}%
          </p>

        </div>

      </div>

    </div>

  );
};

export default Report;