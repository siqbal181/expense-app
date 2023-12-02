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
import { useSpendsContext } from "../../hooks/useSpendsContext";
import NewSpendItem from "./NewSpendItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePickerComponent from "../datePickerComponent/DatePickerComponent";

export const MonthlySpends = () => {
  const { isAuthenticated } = useAuth0();
  const { spends, dispatch } = useSpendsContext();
  const [isDeleteEnabled, setDeleteEnabled] = useState(false);
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentSpends = async () => {
      const response = await fetch("http://localhost:4000/spends");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SPENDS", payload: json });
      }
    };

    fetchCurrentSpends();
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

    const newSpend = spends
      .filter((spendItem) => spendItem.source === "local")
      .map((spendItem) => ({
        category: spendItem.category,
        budget: spendItem.budget,
        month: spendItem.month || "January"
      }));

    if (newSpend.length === 0) {
      console.log("No locally added spend to save.");
      return;
    }

    const response = await fetch("http://localhost:4000/spends/save-spend", {
      method: "POST",
      body: JSON.stringify(newSpend),
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
        console.error("Error saving spends to the database:", textResponse);
      }
    } catch (error) {
      console.error("An error occurred while handling the response:", error);
    }
  };

  const handleDeleteSpend = async (spendItemId) => {
    const response = await fetch(
      `http://localhost:4000/spends/delete-spend/${spendItemId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      console.log("SpendItem deleted successfully");

      const updatedSpends = spends.filter(
        (spendItem) => spendItem._id !== spendItemId,
      );

      dispatch({ type: "SET_SPENDS", payload: updatedSpends });
    } else {
      console.error("Failed to delete spendItem");
    }
  };

  const handleDateChange = (date) => {
    setSelectedMonthYear(date);
    console.log(selectedMonthYear);
  }

  const filterSpendDataByYear = (date) => {
    
  }

  return (
    isAuthenticated && (
      <div>
        <DatePickerComponent onDateChange={handleDateChange}/>
        <Paper elevation={1} style={{ padding: 20, maxWidth: 500 }}>
          <div className="top-row">
            <div className="title-container">
              <Typography variant="h6">Your Monthly Spends</Typography>
            </div>
            <EditIcon
              onClick={toggleEditActions}
              className={isDeleteEnabled ? "edit-enabled" : "edit-disabled"}
            />
          </div>
          <TableContainer>
            <Table aria-label="Spend Table">
              <TableBody>
                {spends.map((spendItem) => (
                  <TableRow
                    key={spendItem._id}
                    className={
                      spendItem.source === "database"
                        ? "database-spend"
                        : changesSaved
                        ? "saved-spend"
                        : "local-spend"
                    }
                  >
                    <TableCell>{spendItem.category}</TableCell>
                    <TableCell>{spendItem.budget}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => {
                          if (isDeleteEnabled) {
                            handleDeleteSpend(spendItem._id);
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
              {isDeleteEnabled && <NewSpendItem />}
          </div>
          {isDeleteEnabled && (
            <Button
              className="save-changes-button"
              variant="contained"
              color="primary"
              disabled={!isSaveEnabled}
              onClick={handleSaveChanges}
              style={{marginTop: "10px"}}
            >
              Save Changes
            </Button>
          )}
        </Paper>
      </div>
    )
  );
};
