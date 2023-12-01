import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DoneIcon from '@mui/icons-material/Done';
import { useSpendsContext } from "../../hooks/useSpendsContext";

const NewSpendItem = () => {
  const { spends, dispatch } = useSpendsContext();
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
    !spends.some(spendItem => spendItem.category === category)
  );

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setNewAmount(event.target.value);
  };

  const handleAddSpendItem = () => {
    if (newCategory && newAmount) {
      const newSpendItem = {
        category: newCategory,
        budget: parseFloat(newAmount),
        source: 'local'
      };

      dispatch({ type: 'CREATE_SPEND', payload: newSpendItem });
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
          onClick={() => handleAddSpendItem()}
        />
      </TableCell>
    </TableRow>
  );
};

export default NewSpendItem;
