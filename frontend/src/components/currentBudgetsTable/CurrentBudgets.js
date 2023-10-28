import React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { TableBody } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useBudgetsContext } from "../../hooks/useBudgetsContext";

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();
  const {budgets, dispatch} = useBudgetsContext();

  useEffect(() => {
    const fetchCurrentBudgets = async() => {
      const response = await fetch('http://localhost:4000/save-budget')
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BUDGETS', payload: json})
      }
    }

    fetchCurrentBudgets();
  }, [])

  return (
    isAuthenticated && (
      <div>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
          <Typography variant="h6">Your Monthly Budgets</Typography>
          <TableContainer>
            <Table aria-label="Budget Table">
              <TableBody>
                {budgets.map((budgetItem) => (
                  <TableRow key={budgetItem._id}>
                    <TableCell>{budgetItem.category}</TableCell>
                    <TableCell>{budgetItem.budget}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    )
  );
};
