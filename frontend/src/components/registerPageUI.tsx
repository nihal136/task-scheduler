import React from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: {
    setName: (val: string) => void;
    setEmail: (val: string) => void;
    setPassword: (val: string) => void;
    setConfirmPassword: (val: string) => void;
  };
}

export const RegisterFormUI: React.FC<Props> = ({
  name,
  email,
  password,
  confirmPassword,
  errors,
  onSubmit,
  onChange,
}) => {
  return (
    <div className="signup-container">
      <form onSubmit={onSubmit} className="signup-form">
        <h2>Register User</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              onChange.setName(e.target.value);
            }}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChange.setEmail(e.target.value);
            }}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              onChange.setPassword(e.target.value);
            }}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              onChange.setConfirmPassword(e.target.value);
            }}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        {errors.api && <span className="error api-error">{errors.api}</span>}

        <button type="submit">Sign Up</button>

        <p className="redirect-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
