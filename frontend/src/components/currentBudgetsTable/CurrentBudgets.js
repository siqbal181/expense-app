import React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { TableBody } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";
import NewBudgetItem from "../budgetEditTable/NewBudgetItem";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CurrentBudgets.css'

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();
  const {budgets, dispatch} = useBudgetsContext();
  const [isDeleteEnabled, setDeleteEnabled] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    const fetchCurrentBudgets = async() => {
      const response = await fetch('http://localhost:4000/budgets/')
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BUDGETS', payload: json})
      }
    }

    fetchCurrentBudgets();
  }, [dispatch])

  const toggleEditActions = () => {
    if (isDeleteEnabled && isSaveEnabled) {
      setDeleteEnabled(false);
      setSaveEnabled(false)
    } else {
      setDeleteEnabled(true);
      setSaveEnabled(true);
    }
  }

  const handleSaveChanges = () => {
    setDeleteEnabled(false);
    setSaveEnabled(false);
  }

  const handleDeleteBudget = async (budgetItemId) => {
    const response = await fetch(`http://localhost:4000/budgets/delete-budget/${budgetItemId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      console.log('BudgetItem deleted successfully');
      
      const updatedBudgets = budgets.filter((budgetItem) => budgetItem._id !== budgetItemId);
      
      dispatch({ type: 'SET_BUDGETS', payload: updatedBudgets });
    } else {
      console.error('Failed to delete budgetItem');
    }
  }
  

  return (
    isAuthenticated && (
      <div>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 500 }}>
          <div className="top-row">
            <div className="title-container">
              <Typography variant="h6">Your Monthly Budgets</Typography>
            </div>
            <EditIcon
              onClick={toggleEditActions}
              className={isDeleteEnabled ? "edit-enabled" : "edit-disabled"}
            />
          </div>
          <TableContainer>
            <Table aria-label="Budget Table">
              <TableBody>
                {budgets.map((budgetItem) => (
                  <TableRow key={budgetItem._id}>
                    <TableCell>{budgetItem.category}</TableCell>
                    <TableCell>{budgetItem.budget}</TableCell>
                    <TableCell>
                    <DeleteIcon
                        onClick={() => {
                          if (isDeleteEnabled) {
                            handleDeleteBudget(budgetItem._id)
                          }
                        }}
                        className={isDeleteEnabled ? "delete-enabled" : "delete-disabled"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="button-container">
        <div className="left-content">
          <NewBudgetItem />
        </div>
        </div>
        <Button
            className="save-changes-button"
            variant="contained"
            color="primary"
            disabled={!isSaveEnabled}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Paper>
      </div>
    )
  );
};
