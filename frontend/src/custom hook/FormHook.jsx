import React, { useState } from "react";

function useForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statement, setStatement] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return {
    email,
    username,
    password,
    statement,
    code,
    isLoading,
    setIsLoading,
    setEmail,
    setUsername,
    setPassword,
    setStatement,
    setCode,
  };
}

export default useForm;
