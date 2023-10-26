import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 400 }}>
          <Typography variant="h6">Your Monthly Budgets</Typography>
          <TableContainer>
            <Table aria-label="Budget Table">
              {/* Add your table content here */}
            </Table>
          </TableContainer>
        </Paper>
      </div>
    )
  );
};
