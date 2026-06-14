import React, { useState } from "react";

function useForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statement, setStatement] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  return {
    email,
    username,
    password,
    confirmPassword,
    statement,
    code,
    isLoading,
    showPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    setShowPassword,
    setIsLoading,
    setEmail,
    setUsername,
    setPassword,
    setConfirmPassword,
    setStatement,
    setCode,
  };
}

export default useForm;
