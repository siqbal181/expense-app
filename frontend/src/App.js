import Navbar from './components/navbar/Navbar';
import { CurrentBudgets } from './components/currentBudgetsTable/CurrentBudgets';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import { MonthlySpends } from './components/monthlySpends/MonthlySpends';
import { Homepage } from './pages/Homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/spends" element={<MonthlySpends />} />
          <Route path="/budgets" element={<CurrentBudgets />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
