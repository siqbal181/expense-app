import './App.css';
import Navbar from './components/navbar/Navbar';
import { CurrentBudgets } from './components/currentBudgetsTable/CurrentBudgets';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <CurrentBudgets/>

    </div>
  );
}

export default App;
