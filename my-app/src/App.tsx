import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Audit from './components/Audit';
import Areas from './components/Areas';
import Standards from './components/Standards';
import Procedures from './components/Procedures';
import Records from './components/Records';
import Summary from './components/Summary';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import StatButtons  from './components/StatButtons ';
import './App.css';
import Login from "./components/Login";
import AuditList from "./components/AuditList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ✅ Default route */}
         <Route path="/" element={<Login onLoginSuccess={() => {}} />} />
          {/* Other pages */}
          <Route path="/AuditList" element={<AuditList/>}/>
          <Route path="/Audit" element={<Audit />} />
          <Route path="/Areas" element={<Areas />} />
          <Route path="/Standards" element={<Standards />} />
          <Route path="/Procedures" element={<Procedures />} />
          <Route path="/Records" element={<Records />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/StatButtons " element={<StatButtons />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
