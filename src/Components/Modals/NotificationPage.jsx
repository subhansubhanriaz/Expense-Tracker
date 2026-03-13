import React, { useContext, useMemo, useState, useEffect } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./Modals.css";

const NotificationPage = ({ onClose }) => {

  const { transactions } = useContext(ExpenseContext);

  const [fraudList, setFraudList] = useState([]);

  // 🔔 Popup notification when new transaction added
  useEffect(() => {

    if (transactions.length > 0) {

      const lastTransaction = transactions[transactions.length - 1];

      alert(`🔔 New Transaction Added: Rs ${lastTransaction.amount}`);

    }

  }, [transactions]);

  const notifications = useMemo(() => {

    return transactions.map((t) => {

      const isFuture = new Date(t.date) > new Date();
      const isSpam = t.amount > 50000 || fraudList.includes(t.id);

      return {
        id: t.id,
        date: t.date,
        wallet: t.wallet,
        category: t.category,
        amount: t.amount,
        type: t.type,
        futureExpense: isFuture,
        spam: isSpam,
        helpline: "0300-1234567",
      };

    });

  }, [transactions, fraudList]);

  const reportFraud = (id) => {

    setFraudList([...fraudList, id]);

    alert("⚠ Fraud reported. Our team will investigate.");

  };

  return (
    <div className="modal-overlay large">

      <div className="modal-card">

        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h2>🔔 Expense Notifications</h2>

        <div className="excel-table">

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Wallet</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Verify</th>
                <th>Helpline</th>
              </tr>

            </thead>

            <tbody>

              {notifications.length === 0 ? (

                <tr>
                  <td colSpan="8" style={{textAlign:"center"}}>
                    No Notifications
                  </td>
                </tr>

              ) : (

                notifications.map((n) => (

                  <tr key={n.id} className={n.spam ? "spam-row" : ""}>

                    <td>{n.date}</td>

                    <td>{n.wallet}</td>

                    <td>{n.category}</td>

                    <td className={n.type === "income" ? "income" : "expense"}>
                      Rs {n.amount}
                    </td>

                    <td>{n.type}</td>

                    <td>

                      {n.futureExpense && (
                        <span className="tag future">
                          Future
                        </span>
                      )}

                      {n.spam && (
                        <span className="tag fraud">
                          Fraud
                        </span>
                      )}

                      {!n.futureExpense && !n.spam && (
                        <span className="tag normal">
                          Normal
                        </span>
                      )}

                    </td>

                    <td>

                      {!n.spam && (
                        <>
                          <button className="btn-ok">
                            Yes
                          </button>

                          <button
                            className="btn-fraud"
                            onClick={() => reportFraud(n.id)}
                          >
                            Report
                          </button>
                        </>
                      )}

                    </td>

                    <td>{n.helpline}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default NotificationPage;