import React, { useState } from "react";
import { TextField, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, InputAdornment, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export const BudgetTable = () => {
  const { isAuthenticated } = useAuth0();

  const [categoryValues, setCategoryValues] = useState({});

  const budgetCategories = [
    { name: "Shopping", value: "1" },
    { name: "Groceries", value: "2" },
    { name: "Rent", value: "3" },
    { name: "Bills", value: "4" },
  ];

  const handleValueChange = (categoryName, newValue) => {
    if (/^\d*\.?\d*$/.test(newValue) || newValue === "") {
      setCategoryValues({
        ...categoryValues,
        [categoryName]: newValue,
      });
    }
  };


  return (
    isAuthenticated && (
      <div>
    <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h6">Enter July Spends</Typography>
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
                      handleValueChange(category.name, e.target.value)
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
      </div>
    )
  );
};
