import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DoneIcon from '@mui/icons-material/Done';
import { useBudgetsContext } from "../../hooks/useBudgetsContext";
import './NewBudgetItem.css'

const NewBudgetItem = () => {
  const { budgets, dispatch } = useBudgetsContext();
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const allCategories = [
    "Shopping",
    "Bills",
    "Groceries",
    "Rent",
    "Leisure",
    "Holidays",
  ];

  const availableCategories = allCategories.filter(category => 
    !budgets.some(budgetItem => budgetItem.category === category)
  );

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setNewAmount(event.target.value);
  };

  const handleAddBudgetItem = () => {
    if (newCategory && newAmount) {
      const newBudgetItem = {
        category: newCategory,
        budget: parseFloat(newAmount),
        source: 'local'
      };

      dispatch({ type: 'CREATE_BUDGET', payload: newBudgetItem });
      setNewCategory("");
      setNewAmount("");
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Select
          value={newCategory}
          onChange={handleCategoryChange}
          className="dropdown-box"
        >
          {availableCategories.length > 0 ? (
            availableCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              No Categories Left
            </MenuItem>
          )}
        </Select>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={newAmount}
          onChange={handleAmountChange}
          className="number-input"
        />
      </TableCell>
      <TableCell>
        <DoneIcon
        className="done-icon"
          onClick={() => handleAddBudgetItem()}
        />
      </TableCell>
    </TableRow>
  );
};

export default NewBudgetItem;
