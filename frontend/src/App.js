import './App.css';
import { BudgetEditTable } from './components/budgetEditTable/BudgetEditTable';
import Navbar from './components/navbar/Navbar';
import { CurrentBudgets } from './components/currentBudgetsTable/CurrentBudgets';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BudgetEditTable/>
      <CurrentBudgets/>

    </div>
  );
}

export default App;
