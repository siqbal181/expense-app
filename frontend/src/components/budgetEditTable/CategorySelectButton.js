import React from "react";
import { Select, MenuItem, Typography } from "@mui/material";
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

  const categoryMessaging = (unusedCategories) => {
    if (unusedCategories.length === 0) {
      return (
        <Typography>Select a Category</Typography>
      ) 
    } else {
      return (
        <Typography>No Categories Left</Typography>
      )
    }
  }

  return (
    <Select value="" onChange={handleCategoryChange}>
      <MenuItem value="" disabled>
        {categoryMessaging(selectedCategories)}
      </MenuItem>
      {unusedCategories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  );
};
