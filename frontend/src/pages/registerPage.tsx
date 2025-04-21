import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiInstance";
import { AxiosError } from "axios";
import { RegisterFormUI } from "../components/registerPageUI";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
}

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const validateRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const signUpRequest = { name, email, password };

    try {
      await axiosInstance.post("/auth/register", signUpRequest);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        if (err.response?.status === 400 && message === "Email in use") {
          setErrors({
            email: "Email is already registered. Redirecting to login...",
          });

          setTimeout(() => {
            navigate("/login");
          }, 2000); // 2 seconds delay
        } else {
          setErrors({ api: message || "Signup failed." });
        }
      } else {
        setErrors({ api: "An unknown error occurred." });
        console.error(err);
      }
    }
  };

  return (
    <RegisterFormUI
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      errors={errors}
      onSubmit={validateRegistration}
      onChange={{ setName, setEmail, setPassword, setConfirmPassword }}
    />
  );
};
