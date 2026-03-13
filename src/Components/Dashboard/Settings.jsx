import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Settings = () => {

  const [darkMode, setDarkMode] = useState(false);

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "PKR"
  );

  const exchangeRates = {
    PKR: 1,
    USD: 0.0036,
    EUR: 0.0033
  };

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Dark mode
  const toggleTheme = () => {

    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Currency change
  const handleCurrencyChange = (e) => {

    const value = e.target.value;

    setCurrency(value);

    localStorage.setItem("currency", value);

    window.location.reload();
  };

  // EXPORT PDF
  const exportData = () => {

  const stored = localStorage.getItem("expenseTrackerState");

  if (!stored) {
    alert("No transactions found");
    return;
  }

  const transactions = JSON.parse(stored);

  if (!transactions.length) {
    alert("Transaction list is empty");
    return;
  }

  const doc = new jsPDF();

  const tableColumn = [
    "Title",
    "Amount",
    "Type",
    "Date"
  ];

  const tableRows = [];

  transactions.forEach((t) => {

    const convertedAmount =
      Number(t.amount) * exchangeRates[currency];

    tableRows.push([
      t.title || t.name || "N/A",
      `${convertedAmount.toFixed(2)} ${currency}`,
      t.type,
      t.date
    ]);

  });

  doc.text("Expense Tracker Report", 14, 15);

  autoTable(doc,{
    head: [tableColumn],
    body: tableRows,
    startY: 20
  });

  doc.save("expense-report.pdf");
};


  return (
    <div className="page-container">

      <h2>Settings</h2>

      <div className="card">

        <label>Currency</label>

        <select
          value={currency}
          onChange={handleCurrencyChange}
        >

          <option value="PKR">PKR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>

        </select>

        <button onClick={toggleTheme}>
          Toggle Dark Mode
        </button>

        <button onClick={exportData}>
          Export Report (PDF)
        </button>

      </div>

    </div>
  );
};

export default Settings;