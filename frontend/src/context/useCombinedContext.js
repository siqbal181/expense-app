import { useContext } from 'react';
import { BudgetsContext } from './BudgetsContext';
import { SpendsContext } from './SpendsContext';

const useCombinedContext = () => {
  const budgetsContext = useContext(BudgetsContext);
  const spendsContext = useContext(SpendsContext);

  if (!budgetsContext || !spendsContext) {
    throw new Error('Both budgetsContext and spendsContext are required within useCombinedContext');
  }

  return {
    budgets: budgetsContext.budgets,
    spends: spendsContext.spends,
    budgetsDispatch: budgetsContext.dispatch,
    spendsDispatch: spendsContext.dispatch,
  };
};

export default useCombinedContext;
