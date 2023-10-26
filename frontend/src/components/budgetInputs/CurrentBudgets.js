import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { TableBody } from "@mui/material";
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
                {budgetData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.category}</TableCell>
                    <TableCell>{entry.budget}</TableCell>
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
