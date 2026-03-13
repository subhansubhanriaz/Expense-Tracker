import React, { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { convertCurrency, currencySymbol } from "../../utils/Currency";

const BalanceCard = () => {

  const { income, expense, balance } = useContext(ExpenseContext);

  return (

    <div className="balance-cards">

      <div className="card income">

        <h3>Income</h3>

        <p>
          {currencySymbol()} {convertCurrency(income)}
        </p>

      </div>

      <div className="card expense">

        <h3>Expense</h3>

        <p>
          {currencySymbol()} {convertCurrency(expense)}
        </p>

      </div>

      <div className="card balance">

        <h3>Balance</h3>

        <p>
          {currencySymbol()} {convertCurrency(balance)}
        </p>

      </div>

    </div>

  );
};

export default BalanceCard;