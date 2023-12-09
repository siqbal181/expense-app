import React, { useState, useEffect } from "react";
import { CurrentBudgets } from "../components/currentBudgetsTable/CurrentBudgets";
import { SpendVsBudgetTable } from "../components/spendVsBudgetTable/spendVsBudgetTable";
import { MonthlySpends } from "../components/monthlySpends/MonthlySpends";
import './Homepage.css'

export const Homepage = () => {
  const [monthlySpends, setMonthlySpends] = useState([]);
  const [currentBudgets, setCurrentBudgets] = useState([]);
  const [budgetVsSpend, setBudgetVsSpend] = useState([]);

  useEffect(() => {
    const calculateBudgetVsSpend = () => {
      const mappedSpends = monthlySpends.map((spendItem) => ({
        category: spendItem.category,
        budget: spendItem.budget,
      }));

      const mappedBudgets = currentBudgets.map((budgetItem) => ({
        category: budgetItem.category,
        budget: budgetItem.budget,
      }));

      const budgetVsSpend = mappedBudgets.map((budgetItem) => {
        const matchingSpend = mappedSpends.find(
          (spendItem) => spendItem.category === budgetItem.category
        );

        const difference = matchingSpend
          ? budgetItem.budget - matchingSpend.budget
          : budgetItem.budget;

        return {
          category: budgetItem.category,
          difference,
        };
      });

      setBudgetVsSpend(budgetVsSpend);
    };

    calculateBudgetVsSpend();
  }, [monthlySpends, currentBudgets]);

  return (
    <>
      <h1>Homepage</h1>
      <div className="table-layout">
        <CurrentBudgets setBudgets={setCurrentBudgets}/>
        <MonthlySpends setSpends={setMonthlySpends}/>
        <SpendVsBudgetTable spends={monthlySpends} budgets={currentBudgets} budgetVsSpend={budgetVsSpend}/>
      </div>
    </>
  )
}
