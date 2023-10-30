import { createContext, useReducer } from 'react'

export const BudgetsContext = createContext();

export const budgetsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BUDGETS':
      return {
        budgets: action.payload
      }
    case 'CREATE_BUDGET':
      return {
        budgets: [...state.budgets, action.payload]
      }
    default:
      return state
  }
}

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