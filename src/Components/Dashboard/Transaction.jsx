import React, { useContext, useState, useMemo } from 'react'
import { ExpenseContext } from '../../context/ExpenseContext'

const Transaction = () => {
    const {transactions} = useContext(ExpenseContext);
    const [filterType,setFilterType] = useState("all");

    const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions;
    return transactions.filter((t) => t.type === filterType);
  }, [transactions, filterType]);

   return (
    <div>
    <div className="page-container">
      <div className="page-header">
        <h2>Transactions</h2>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Wallet</th>
              <th>Amount</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.category}</td>
                <td>{t.wallet}</td>
                <td className={t.type === "income" ? "income" : "expense"}>
                  Rs {t.amount}
                </td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>      
    </div>
  )
}

export default Transaction
