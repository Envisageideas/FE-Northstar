import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Audit from './components/Audit';
import Areas from './components/Areas';
import Standards from './components/Standards';
import Procedures from './components/Procedures';
import Records from './components/Records';
import Summary from './components/Summary';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Stat_btn from './components/Stat_btn';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ✅ Default route */}
          <Route path="/" element={<Audit />} />

          {/* Other pages */}
          <Route path="/Areas" element={<Areas />} />
          <Route path="/Standards" element={<Standards />} />
          <Route path="/Procedures" element={<Procedures />} />
          <Route path="/Records" element={<Records />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Sidebar" element={<Sidebar/>} />
          <Route path="/Stat_btn" element={<Stat_btn/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
