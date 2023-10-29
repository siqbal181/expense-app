import React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { TableBody } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";
import { BudgetEditTable } from "../budgetEditTable/BudgetEditTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CurrentBudgets.css'

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();
  const {budgets, dispatch} = useBudgetsContext();
  const [isDeleteEnabled, setDeleteEnabled] = useState(false)

  useEffect(() => {
    const fetchCurrentBudgets = async() => {
      const response = await fetch('http://localhost:4000/save-budget')
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BUDGETS', payload: json})
      }
    }

    fetchCurrentBudgets();
  }, [budgets])

  const toggleDeleteEnabled = () => {
    setDeleteEnabled(true);
  }

  return (
    isAuthenticated && (
      <div>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
          <div className="top-row">
            <div className="title-container">
              <Typography variant="h6">Your Monthly Budgets</Typography>
            </div>
            <EditIcon
              onClick={toggleDeleteEnabled}
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
                            // Handle delete logic here
                          }
                        }}
                        className={isDeleteEnabled ? "enabled" : "disabled"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <BudgetEditTable/>
        </Paper>
      </div>
    )
  );
};
