import './App.css';
import { BudgetTable } from './components/budget-table/BudgetTable';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BudgetTable/>
    </div>
  );
}

export default App;
