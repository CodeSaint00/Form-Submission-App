import React, { useState } from "react";

function useForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return { email, username, password, setEmail, setUsername, setPassword };
}

export default useForm;
