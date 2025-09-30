import { useState } from 'react';
import Login from './components/Login';
import AuditList from './components/AuditList';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AuditList />
      )}
    </div>
  );
}

export default App;