import React from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: {
    pass?: string;
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
        <h2>Register User </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => onChange.setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => onChange.setConfirmPassword(e.target.value)}
          required
        />

        {errors.pass && <p>{errors.pass}</p>}
        {errors.api && <p>{errors.api}</p>}

        <button type="submit">Submit</button>
        <p className="redirect-text">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
