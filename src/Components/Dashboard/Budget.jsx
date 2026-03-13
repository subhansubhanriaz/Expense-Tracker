
import React, { useContext, useMemo, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const Budget = () => {
    const { transactions } = useContext(ExpenseContext);
    const [budget, setBudget] = useState(20000);

    const totalExpense = useMemo(() => {
        return transactions
            .filter((t) => t.type === "expense")
            .reduce((acc, curr) => acc + Number(curr.amount), 0);
    }, [transactions]);

    const percentage = Math.min((totalExpense / budget) * 100, 100);

    return (
        <div className="page-container">
            <h2>Monthly Budget</h2>

            <div className="card">
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                />

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* <p>Spent: Rs {totalExpense}</p>
        <p>Remaining: Rs {budget - totalExpense}</p> */}
                <p>Spent: {currencySymbol()} {convertCurrency(totalExpense)}</p>
                <p>Remaining: {currencySymbol()} {convertCurrency(budget - totalExpense)}</p>

                {totalExpense > budget && (
                    <p className="warning">⚠ Budget Exceeded!</p>
                )}
            </div>
        </div>
    );
};

export default Budget;
