import './App.css';
import { BudgetInputs } from './components/budgetInputs/BudgetInputs';
import { BudgetEditTable } from './components/budgetEditTable/BudgetEditTable';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BudgetEditTable/>

    </div>
  );
}

export default App;
