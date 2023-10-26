import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { InputAdornment, Typography } from "@mui/material";

export const BudgetEditTable = () => {
  const [categoryValues, setCategoryValues] = useState({});

  const budgetCategories = [
    { name: "Shopping", value: "1" },
    { name: "Groceries", value: "2" },
    { name: "Rent", value: "3" },
    { name: "Bills", value: "4" },
  ];

  const budgetCategory = ['Shopping', 'Grocery', ' Rent', 'Bills', 'Charity'];

  const handleAddCategory = () => {
    // create a new row in the budget table
    // create a dropdown menu of list of choices
    // make an empty const array of categoriesNotUsed
    // iterate over the budgetCategory list
    // for the ones which are not used in the Budget Table (via state), add in the array
  }

  return (
    <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h6">Edit Your Budgets</Typography>
      <TableContainer>
        <Table aria-label="Budget Table">
          <TableBody>
            {budgetCategories.map((category) => (
              <TableRow key={category.value}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    value={categoryValues[category.name] || ""}
                    onChange={(e) => console.log("Hello")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">£</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" style={{ marginTop: 22, margin: 4 }}>
        Submit
      </Button>
      <Button variant="contained" color="primary" style={{ marginTop: 22, margin: 4 }} onClick={handleAddCategory}>
        Add Category
      </Button>
    </Paper>
  );
};
