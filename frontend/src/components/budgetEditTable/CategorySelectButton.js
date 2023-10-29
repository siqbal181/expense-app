import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";

export const CategorySelectButton = ({ allCategories, selectedCategories, handleCategorySelect }) => {
  const { budgets } = useBudgetsContext();

  const budgetCategories = budgets.map((budgetItem) => budgetItem.category);

  const unusedCategories = allCategories.filter((category) => {
    return !selectedCategories.includes(category) && !budgetCategories.includes(category);
  });

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
