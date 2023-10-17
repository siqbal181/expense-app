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

export const BudgetInputs = () => {
  const [categoryValues, setCategoryValues] = useState({});

  const budgetCategories = [
    { name: "Shopping", value: "1" },
    { name: "Groceries", value: "2" },
    { name: "Rent", value: "3" },
    { name: "Bills", value: "4" },
  ];


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
                    onChange={(e) =>
                      console.log("Hello")
                    }
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
      <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
        Submit
      </Button>
    </Paper>
  );
};
