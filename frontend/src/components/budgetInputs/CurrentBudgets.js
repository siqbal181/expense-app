import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TableBody } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { budgetData } from "../../budgetData";

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
          <Typography variant="h6">Your Monthly Budgets</Typography>
          <TableContainer>
            <Table aria-label="Budget Table">
              <TableBody>
                {budgetData.map((entry) => (
                  <TableRow key={entry.category}>
                    <TableCell>{entry.category}</TableCell>
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
