import { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Static credentials check
    if (email === 'admin@gmail.com' && password === '123') {
      console.log('Login successful');
      onLoginSuccess();

      // ✅ Navigate immediately to next page
      navigate("/AuditList");
    } else {
      alert("Invalid email or password"); // simple alert instead of toast
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="login-title">AUDITSMART</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required/>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required/>

          {/* ✅ Login button triggers form submit */}
          <button type="submit" className="login-button" onSubmit={handleSubmit}>
            Login
          </button>

          <a href="#" className="forgot-password">
            Forgot Password
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
