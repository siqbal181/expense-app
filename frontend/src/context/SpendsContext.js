import { createContext, useReducer } from 'react'

export const SpendsContext = createContext();

export const spendsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SPENDS':
      const fetchedSpends = action.payload.map((spend) => ({
        ...spend,
        source: 'database',
      }));
      return {
        spends: fetchedSpends,
      };
    case 'CREATE_SPEND':
      const newSpendItem = { ...action.payload, source: 'local' };
      return {
        spends: [...state.spends, newSpendItem],
      };
    case 'UPDATE_SPEND':
      const { _id, spend } = action.payload;
      const updatedSpend = state.spends.map((spendItem) =>
        spendItem._id === _id ? { ...spendItem, spend } : spendItem
      );
      return {
        spends: updatedSpend,
      };
    default:
      return state;
  }
};


export const SpendsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(spendsReducer, {
    spends: []
  })

  return (
    <SpendsContext.Provider value={{...state, dispatch}}>
      { children }
    </SpendsContext.Provider>
  )
}