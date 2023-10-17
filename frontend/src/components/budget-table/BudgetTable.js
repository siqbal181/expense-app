import React from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { useState } from "react";

export const BudgetTable = () => {
  const [categoryValues, setCategoryValues] = useState({})

  const budgetCategories = [
    { name: "Shopping", value: "1" },
    { name: "Groceries", value: "2" },
    { name: "Rent", value: "3" },
    { name: "Bills", value: "4" },
  ];

  const handleValueChange = (categoryName, newValue) => {
    setCategoryValues({
      ...categoryValues,
      [categoryName]: newValue,
    });
  }

  return (
    <Grid container spacing={2}>
      {budgetCategories.map((category) => (
        <Grid item xs={6} key={category.value}>
          <TextField
            label={category.name}
            variant="outlined"
            value={categoryValues[category.name] || ""}
            onChange={(e) => handleValueChange(category.name, e.target.value)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
