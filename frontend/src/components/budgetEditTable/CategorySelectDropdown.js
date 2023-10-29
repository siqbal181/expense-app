import React from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";

export const CategorySelectDropdown = ({ allCategories, selectedCategories, handleCategorySelect }) => {
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
        <Typography>No categories left</Typography>
      ) 
    } else {
      return (
        <Typography>Select a category</Typography>
      )
    }
  }

  return (
    <Select
      value={selectedCategories} // Set the value to the selected category
      onChange={handleCategoryChange}
      style={{ width: "140px" }}
    >
      <MenuItem value="" disabled>
        {categoryMessaging(unusedCategories)}
      </MenuItem>
      {unusedCategories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  );
};
