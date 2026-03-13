import React, { useState } from "react";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const TransactionHistory = ({ transactions, onDeleteTransaction }) => {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
      <input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Name</th><th>Category</th><th>Wallet</th><th>Amount</th><th>Type</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.name}</td>
              <td>{t.category}</td>
              <td>{t.wallet}</td>
              {/* <td>${t.amount}</td> */}
              <td>{currencySymbol()} {convertCurrency(t.amount)}</td>
              <td>{t.type}</td>
              <td><button onClick={() => onDeleteTransaction(t.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;