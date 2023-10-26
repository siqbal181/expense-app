import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { InputAdornment, Select, MenuItem, Typography } from "@mui/material";

export const BudgetEditTable = () => {
  const [categoryValues, setCategoryValues] = useState({});
  const [categories, setCategories] = useState(['Shopping']);

  const allCategories = ['Shopping', 'Bills', 'Groceries', 'Rent', 'Leisure', 'Holidays'];

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
      setCategoryValues({ ...categoryValues, [category]: "" });
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    addCategory(selectedCategory);
  };

  return (
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" style={{ marginTop: 23, margin: 4 }}>
        Submit
      </Button>
      <CategorySelectButton
        allCategories={allCategories}
        selectedCategories={categories}
        handleCategorySelect={handleCategorySelect}
      />
    </Paper>
  );
};

const CategorySelectButton = ({ allCategories, selectedCategories, handleCategorySelect }) => {
  const unusedCategories = allCategories.filter(category => !selectedCategories.includes(category));

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory !== "") {
      handleCategorySelect(selectedCategory);
    }
  };

  return (
    <Select value="" onChange={handleCategoryChange}>
      <MenuItem value="" disabled>
        Select a Category
      </MenuItem>
      {unusedCategories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  );
};
