import { createContext, useReducer } from 'react'

export const BudgetsContext = createContext();

export const budgetsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BUDGETS':
      const fetchedBudgets = action.payload.map((budget) => ({
        ...budget,
        source: 'database',
      }));
      return {
        budgets: fetchedBudgets,
      };
    case 'CREATE_BUDGET':
      const newBudgetItem = { ...action.payload, source: 'local' };
      return {
        budgets: [...state.budgets, newBudgetItem],
      };
    case 'UPDATE_BUDGET':
      const { _id, budget } = action.payload;
      const updatedBudgets = state.budgets.map((budgetItem) =>
        budgetItem._id === _id ? { ...budgetItem, budget } : budgetItem
      );
      return {
        budgets: updatedBudgets,
      };
    default:
      return state;
  }
};


export const BudgetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetsReducer, {
    budgets: []
  })

  return (
    <BudgetsContext.Provider value={{...state, dispatch}}>
      { children }
    </BudgetsContext.Provider>
  )
}