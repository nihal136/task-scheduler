import React from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";

interface Props {
  email: string;
  password: string;
  errors: {
    api?: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: {
    setEmail: (val: string) => void;
    setPassword: (val: string) => void;
  };
}

export const LoginFormUI: React.FC<Props> = ({
  email,
  password,
  errors,
  onSubmit,
  onChange,
}) => {
  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange.setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange.setPassword(e.target.value)}
          required
        />
        
        {errors.api && <p>{errors.api}</p>}

        <button type="submit">Login</button>
        
        <p className="redirect-text">
          Don't have an account? <Link to="/register">SignUp</Link>
        </p>
      </form>
    </div>
  );
};
