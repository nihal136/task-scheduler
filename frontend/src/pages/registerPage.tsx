import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiInstance";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import SignupFormUI from "../components/registerPageUI";

interface Errors {
  api?: string;
  pass?: string;
}

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const validateRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (password.length < 6) {
      setErrors({ pass: "Minimum 6 characters required for password." });
      return;
    }

    if (password != confirmPassword) {
      setErrors({ pass: "Passwords Do Not Match" });
      return;
    }

    const signUpRequest = { name, email, password };

    try {
      await axiosInstance.post("/auth/register", signUpRequest);
      toast.success("User registered successfully!");

      navigate("/auth/login");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;

        if (err.response?.status === 400 && message === "Email in use") {
          toast.info("User already exists. Redirecting to login...");
          navigate("/auth/login");
        } else {
          const errorMsg = message || "Signup failed.";
          setErrors({ api: errorMsg });
          toast.error(errorMsg);
        }
      } else {
        toast.error("An unknown error occurred.");
        console.error(err);
      }
    }
  };

  return (
    <SignupFormUI
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
