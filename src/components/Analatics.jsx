import { Progress } from "antd";
import React from "react";
import "../resources/analatics.css";

const Analatics = ({ transactions }) => {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnOver = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnOver = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercentage =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  const categories = [
    "food",
    "education",
    "entertainment",
    "travelling",
    "medical",
    "tax",
    "salary",
    "extra_income",
  ];

  return (
    <div className="analatics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions} </h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expense : {totalExpenseTransactions.length}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-3"
                strokeColor="#25A34D"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#DE3131"
                type="circle"
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="transactions-count ">
            <h4>Total Turnover : {totalTurnOver} </h4>
            <hr />
            <h5>Income : {totalIncomeTurnOver}</h5>
            <h5>Expense : {totalExpenseTurnOver}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-3"
                strokeColor="#25A34D"
                type="circle"
                percent={totalIncomeTurnOverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#DE3131"
                type="circle"
                percent={totalExpenseTurnOverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-4" />
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5> {category}</h5>
                    <p>₹ {amount}</p>
                    <Progress
                      strokeColor="#596CD6"
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5> {category}</h5>
                    <p>₹ {amount} </p>
                    <Progress
                      strokeColor="#596CD6"
                      percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analatics;
