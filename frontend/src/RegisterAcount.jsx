import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function RegisterAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:27017/register", {
        username,
        email,
        password,
        confirmPassword,
      });
    } catch (err) {
      console.log("Something went Wrong");
    }
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const clickSubmitRef = useRef(null);
  const handlePressEnterToEmail = (e) => {
    if (e.key === "Enter") return emailRef.current.focus();
  };
  const handlePressEnterToPassword = (e) => {
    if (e.key === "Enter") return passwordRef.current.focus();
  };
  const handlePressEnterToConfirmPassword = (e) => {
    if (e.key === "Enter") return confirmPasswordRef.current.focus();
  };
  const handleClickSubmit = (e) => {
    if (e.key === "Enter") return clickSubmitRef.current.click();
  };

  return (
    <div>
      <form action={handleSubmit}>
        <h2>Register Now</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
          onKeyDown={handlePressEnterToEmail}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          onKeyDown={handlePressEnterToPassword}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePressEnterToConfirmPassword}
          ref={passwordRef}
        />
        <input
          type="password"
          placeholder="Comfirm Password"
          onChange={(e) => setComfirmPassword(e.target.value)}
          onKeyDown={handleClickSubmit}
          ref={confirmPasswordRef}
        />
        <button type="button" ref={clickSubmitRef}>
          Create
        </button>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
