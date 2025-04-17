import React from "react";

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

const SignupFormUI: React.FC<Props> = ({
  name,
  email,
  password,
  confirmPassword,
  errors,
  onSubmit,
  onChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onChange.setName(e.target.value)}
        required
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onChange.setEmail(e.target.value)}
        required
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => onChange.setPassword(e.target.value)}
        required
      />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => onChange.setConfirmPassword(e.target.value)}
        required
      />
      <br />

      {errors.pass && <p>{errors.pass}</p>}
      {errors.api && <p>{errors.api}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupFormUI;
