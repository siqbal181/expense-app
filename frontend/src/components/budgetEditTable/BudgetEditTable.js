import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { InputAdornment } from "@mui/material";
import { CategorySelectButton } from "./CategorySelectButton";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";

export const BudgetEditTable = () => {
  const { dispatch } = useBudgetsContext();

  const [categoryValues, setCategoryValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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
                <TableCell>{category}</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
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
                  <div className="trash-icon">
                    <i
                      className="material-icons"
                      onClick={() => deleteCategory(category)}
                    >
                      delete
                    </i>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 23, margin: 4 }}
        onClick={() => handleSubmit(categories, categoryValues)}
      >
        Submit
      </Button>
      <CategorySelectButton
        allCategories={allCategories}
        selectedCategories={categories}
        handleCategorySelect={handleCategorySelect}
      />
    </>
  );
};
