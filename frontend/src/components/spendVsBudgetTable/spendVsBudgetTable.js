import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useCombinedContext from "../../context/useCombinedContext";

import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import VillaIcon from '@mui/icons-material/Villa';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PaymentIcon from '@mui/icons-material/Payment';

export const SpendVsBudgetTable = ({ selectedMonthSpend, monthlyBudget }) => {

  const calculateBudgetVsSpend = (selectedMonthSpend, monthlyBudget, spends) => {
    // map over each of the categories
    // if they exist within monthly budget 
    // take it away from the budget 
    // if it does not exist then still take it away but mark as uncategorised budget item
  }

  return (
    <>
      <Paper elevation={1} style={{ padding: 20, maxWidth: 500 }}>
        <Typography variant="h6">Spend Vs Budget</Typography>

      </Paper>
    </>
  )
}