import { Progress } from "antd";
import React from "react";
import "../Resources/Analatics.css";

function Analatics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "expence"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;
  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / totalTurnover) * 100;

  const categories = [
    "salary",
    "freelancing",
    "food",
    "entertainment",
    "medical",
    "education",
    "investment",
    "rent",
    "tax",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4><b>Total Transactions : {totalTransactions}</b></h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expence : {totalExpenceTransactions.length}</h5>

            <div className="progress-bars ">
              <Progress
                className="mx-4"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenceTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count ">
            <h4><b>Total Turnover : {totalTurnover}</b></h4>
            <hr />
            <h5>Income : {totalIncomeTurnover}</h5>
            <h5>Expence : {totalExpenceTurnover}</h5>

            <div className="progress-bars ">
              <Progress
                className="mx-4"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenceTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="income-category-analysis">
            <h4><b>Income - Category Wise</b></h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount >0 && <div className="category-card">
                  <h5>{category}</h5>
                  <Progress percent={((amount / totalIncomeTurnover)*100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis">
            <h4><b>Expense- Category Wise</b></h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "expence" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount >0 && <div className="category-card">
                  <h5>{category}</h5>
                  <Progress percent={((amount / totalExpenceTurnover)*100).toFixed(0)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Analatics;
