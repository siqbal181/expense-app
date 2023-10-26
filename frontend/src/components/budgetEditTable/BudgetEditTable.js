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
import { CategorySelectButton } from "./CategorySelectButton";
import { useAuth0 } from "@auth0/auth0-react";
import { budgetData } from "../../budgetData";

export const BudgetEditTable = () => {
  const { isAuthenticated } = useAuth0();

  const [categoryValues, setCategoryValues] = useState({});
  const [categories, setCategories] = useState(['Shopping']);

  const allCategories = ['Shopping', 'Bills', 'Groceries', 'Rent', 'Leisure', 'Holidays'];

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
      setCategoryValues({ ...categoryValues, [category]: "" });
    }
  };

  const deleteCategory = (category) => {
    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
  };

  const handleCategorySelect = (selectedCategory) => {
    addCategory(selectedCategory);
  };

  const saveBudgets = () => {
    const updatedBudgets = categories.map((category) => ({
      category,
      amount: categoryValues[category] || 0,
    }));

    budgetData.length = 0;
    Array.prototype.push.apply(budgetData, updatedBudgets);
  };
  return (
    isAuthenticated && (
      <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h6">Edit Your Budgets</Typography>
      <TableContainer>
        <Table aria-label="Budget Table">
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    value={categoryValues[category] || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setCategoryValues({ ...categoryValues, [category]: newValue });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">£</InputAdornment>
                      ),
                    }}
                  />
                  <div className="trash-icon">
                    <i className="material-icons" onClick={() => deleteCategory(category)}>delete</i>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" style={{ marginTop: 23, margin: 4 }} onClick={saveBudgets(categories, categoryValues)}>
        Submit
      </Button>
      <CategorySelectButton
        allCategories={allCategories}
        selectedCategories={categories}
        handleCategorySelect={handleCategorySelect}
      />
    </Paper>
    )
  );
};
