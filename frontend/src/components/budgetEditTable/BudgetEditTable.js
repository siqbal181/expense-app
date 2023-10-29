import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";
import { CategorySelectDropdown } from "./CategorySelectDropdown";

export const BudgetEditTable = () => {
  const { dispatch } = useBudgetsContext();

  const [categoryValues, setCategoryValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const allCategories = [
    "Shopping",
    "Bills",
    "Groceries",
    "Rent",
    "Leisure",
    "Holidays",
  ];

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

  const handleAddCategoryClick = () => {
    setIsAddingCategory(true);
  };

  const handleAddRow = (selectedCategory) => {
    setIsAddingCategory(false);
    addCategory(selectedCategory);
  };

  const handleCategorySelect = (selectedCategory) => {
    addCategory(selectedCategory);
  };

  const handleSubmit = async (categories, categoryValues) => {
    const newBudget = categories.map((category) => ({
      category,
      budget: parseFloat(categoryValues[category]),
    }));

    const response = await fetch("http://localhost:4000/budgets/save-budget", {
      method: "POST",
      body: JSON.stringify(newBudget),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const textResponse = await response.text();

    try {
      const json = JSON.parse(textResponse);
      if (response.ok) {
        setError(null);
        setCategoryValues({});
        setCategories([]);
        dispatch({ type: "CREATE_BUDGET", payload: json });
      } else {
        setError(json.error);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="Budget Table">
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category}>
                <TableCell>
                  <CategorySelectDropdown
                    allCategories={allCategories}
                    selectedCategories={categories}
                    handleCategorySelect={handleCategorySelect}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    style={{ maxWidth: "5rem" }}
                    value={categoryValues[category] || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setCategoryValues({
                        ...categoryValues,
                        [category]: newValue,
                      });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">£</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteCategory(category)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {isAddingCategory && (
              <TableRow>
                <TableCell>
                  <CategorySelectDropdown
                    allCategories={allCategories}
                    selectedCategories={categories}
                    handleCategorySelect={handleAddRow}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    style={{ maxWidth: "5rem" }}
                    value={categoryValues["newCategory"] || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setCategoryValues({
                        ...categoryValues,
                        newCategory: newValue,
                      });
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">£</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteCategory("newCategory")}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddCategoryClick}
        >
          <AddIcon />
          Add Category
        </Button>
      </TableContainer>
    </>
  );
};
