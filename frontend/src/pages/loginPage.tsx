import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/apiInstance";
import { LoginFormUI } from "../components/loginPageUi";
import { toast } from "react-toastify";

interface Errors {
  api?: string;
}

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const loginRequest = { email, password };
    try {
      const loginRes = await axiosInstance.post("/auth/login", loginRequest);

      localStorage.setItem("token", loginRes.data.token);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message;
        if (err.response?.status === 401) {
          if (message === "Invalid Details") {
            setErrors({ api: message });
          } else if (message === "User Does not Exist") {
            toast.info("User Not Found. Redirecting to Register...");
            setTimeout(() => {
              navigate("/register");
            }, 2000); // 2-second delay
          }
        } else {
          console.error("Login Error : ", message);
          setErrors({ api: "Login Failed!!!" });
        }
      }
    }
  };
  return (
    <LoginFormUI
      email={email}
      password={password}
      errors={errors}
      onSubmit={validateLogin}
      onChange={{ setEmail, setPassword }}
    />
  );
};
