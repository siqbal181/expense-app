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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import "./CurrentBudgets.css";

export const CurrentBudgets = () => {
  const { isAuthenticated } = useAuth0();
  const { budgets, dispatch } = useBudgetsContext();
  const [isDeleteEnabled, setDeleteEnabled] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [editedBudget, setEditedBudget] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentBudgets = async () => {
      const response = await fetch("http://localhost:4000/budgets/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BUDGETS", payload: json });
      }
    };

    fetchCurrentBudgets();
  }, [dispatch]);

  const toggleEditActions = () => {
    if (isDeleteEnabled && isSaveEnabled) {
      setDeleteEnabled(false);
      setSaveEnabled(false);
    } else {
      setDeleteEnabled(true);
      setSaveEnabled(true);
    }
  };

  const handleSaveChanges = async () => {
    setDeleteEnabled(false);
    setSaveEnabled(false);

    const newBudget = budgets
      .filter((budgetItem) => budgetItem.source === "local")
      .map((budgetItem) => ({
        category: budgetItem.category,
        budget: budgetItem.budget,
      }));

    if (newBudget.length === 0) {
      console.log("No locally added budgets to save.");
      return;
    }

    const response = await fetch("http://localhost:4000/budgets/save-budget", {
      method: "POST",
      body: JSON.stringify(newBudget),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      const textResponse = await response.text();
      if (response.ok) {
        setChangesSaved(true);
        setError(null);
      } else {
        console.error("Error saving budgets to the database:", textResponse);
      }
    } catch (error) {
      console.error("An error occurred while handling the response:", error);
    }
  };

  const handleDeleteBudget = async (budgetItemId) => {
    const response = await fetch(
      `http://localhost:4000/budgets/delete-budget/${budgetItemId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      console.log("BudgetItem deleted successfully");

      const updatedBudgets = budgets.filter(
        (budgetItem) => budgetItem._id !== budgetItemId,
      );

      dispatch({ type: "SET_BUDGETS", payload: updatedBudgets });
    } else {
      console.error("Failed to delete budgetItem");
    }
  };

  const handleUpdateBudget = async (budgetItemId, newBudgetValue) => {
    const response = await fetch(
      `http://localhost:4000/budgets/update-budget/${budgetItemId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget: newBudgetValue }),
      },
    );

    if (response.ok) {
      console.log("BudgetItem updated successfully");

      dispatch({
        type: "UPDATE_BUDGET",
        payload: { _id: budgetItemId, budget: newBudgetValue },
      });
    } else {
      console.error("Failed to update budgetItem");
    }
  };

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
                  <TableRow
                    key={budgetItem._id}
                    className={
                      budgetItem.source === "database"
                        ? "database-budget"
                        : changesSaved
                        ? "saved-budget"
                        : "local-budget"
                    }
                  >
                    <TableCell>{budgetItem.category}</TableCell>
                    <TableCell>
                      {editedBudget === budgetItem._id ? (
                        <div>
                          <input
                            type="number"
                            value={budgetItem.budget}
                            onChange={(e) => {
                              const updatedBudgets = budgets.map((item) =>
                                item._id === budgetItem._id
                                  ? {
                                      ...item,
                                      budget: parseFloat(e.target.value),
                                    }
                                  : item,
                              );
                              dispatch({
                                type: "SET_BUDGETS",
                                payload: updatedBudgets,
                              });
                            }}
                          />
                          <Done
                            onClick={() => {
                              handleUpdateBudget(
                                budgetItem._id,
                                budgetItem.budget,
                              );
                              setEditedBudget(null);
                            }}
                          />
                        </div>
                      ) : (
                        <span
                          onClick={() => setEditedBudget(budgetItem._id)}
                          className={isDeleteEnabled ? "editable-budget" : ""}
                        >
                          {budgetItem.budget}
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <DeleteIcon
                        onClick={() => {
                          if (isDeleteEnabled) {
                            handleDeleteBudget(budgetItem._id);
                          }
                        }}
                        className={
                          isDeleteEnabled ? "delete-enabled" : "delete-disabled"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="button-container">
            {isDeleteEnabled && <NewBudgetItem />}
          </div>
          {isDeleteEnabled && (
            <Button
              className="save-changes-button"
              variant="contained"
              color="primary"
              disabled={!isSaveEnabled}
              onClick={handleSaveChanges}
              style={{ marginTop: "10px" }}
            >
              Save Changes
            </Button>
          )}
        </Paper>
      </div>
    )
  );
};
