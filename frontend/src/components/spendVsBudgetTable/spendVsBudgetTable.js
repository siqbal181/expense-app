import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useCombinedContext from "../../context/useCombinedContext";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import VillaIcon from "@mui/icons-material/Villa";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PaymentIcon from "@mui/icons-material/Payment";

export const SpendVsBudgetTable = ({ selectedMonthSpend, monthlyBudget }) => {
  const { budgets, spends, budgetsDispatch, spendsDispatch } =
    useCombinedContext();

  useEffect(() => {
    const fetchCurrentBudgets = async () => {
      const response = await fetch("http://localhost:4000/budgets/");
      const json = await response.json();

      if (response.ok) {
        budgetsDispatch({ type: "SET_BUDGETS", payload: json });
      }
    };

    fetchCurrentBudgets();
  }, [budgetsDispatch]);

  useEffect(() => {
    const fetchMonthlySpends = async () => {
      const response = await fetch(`http://localhost:4000/spends/`);
      const json = await response.json();

      if (response.ok) {
        spendsDispatch({ type: "SET_SPENDS", payload: json });
      }
    };
    fetchMonthlySpends();
  }, [spendsDispatch]);

  const calculateBudgetVsSpend = () => {
    const mappedSpends = spends.map((spendItem) => ({
      category: spendItem.category,
      budget: spendItem.budget,
    }));
  
    const mappedBudgets = budgets.map((budgetItem) => ({
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
  
    return budgetVsSpend;
  };
  
  return (
    <>
      <Paper elevation={1} style={{ padding: 20, maxWidth: 500 }}>
        <Typography variant="h6">Spend Vs Budget</Typography>
        <calculateBudgetVsSpend/>
      </Paper>
    </>
  );
};
