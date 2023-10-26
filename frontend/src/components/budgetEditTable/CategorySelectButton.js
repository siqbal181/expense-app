import React from "react";
import { Select, MenuItem } from "@mui/material";

 export const CategorySelectButton = ({ allCategories, selectedCategories, handleCategorySelect }) => {
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