import React, { useState } from "react";
import { uniqueId } from "../../utils";

const TransictionForm = ({ onNewTransaction, categories = [], wallets = [] }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [wallet, setWallet] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !category || !wallet || !date) {
      setError("Please fill all fields!");
      return;
    }

    const transaction = {
      id: uniqueId(),
      name,
      amount: parseFloat(amount),
      type,
      category,
      wallet,
      date
    };

    onNewTransaction(transaction);

    setName("");
    setAmount("");
    setCategory("");
    setWallet("");
    setDate("");
    setType("income");
    setError("");
  };

  return (
    <div className="transaction-form">
      <h2>Add New Transaction</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Salary, Grocery..." />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Wallet</label>
          <select value={wallet} onChange={(e) => setWallet(e.target.value)}>
            <option value="">Select wallet</option>
            {wallets.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button className="btn-submit" type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransictionForm;