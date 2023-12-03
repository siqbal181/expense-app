import React, { useEffect } from "react";
import { CurrentBudgets } from "../components/currentBudgetsTable/CurrentBudgets";
import { SpendVsBudgetTable } from "../components/spendVsBudgetTable/spendVsBudgetTable";
import { MonthlySpends } from "../components/monthlySpends/MonthlySpends";

export const Homepage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <CurrentBudgets/>
      <MonthlySpends/>
    </>
  )
}