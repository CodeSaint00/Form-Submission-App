import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statement, setStatement] = useState("");
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setStatement("**All Fields are required");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    if (password > 8) {
      setStatement("**Passwords must be greater than 8");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const buttonRef = useRef(null);
  const handlePressEnterToEmail = (e) => {
    if (e.key === "Enter") {
      emailRef.current.focus();
    }
  };
  const handlePressEnterToPassword = (e) => {
    if (e.key === "Enter") return passwordRef.current.focus();
  };
  const handlePressEnterToConfirmPassword = (e) => {
    if (e.key === "Enter") return confirmPasswordRef.current.focus();
  };
  const handlePressEnterToSubmit = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
      buttonRef.current.focus();
      confirmPasswordRef.current.blur();
    }
  };

  return (
    <div>
      <form action="">
        <h2>Register Now</h2>
        <span className="statement">{statement}</span>
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
          onKeyDown={handlePressEnterToPassword}
          ref={emailRef}
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
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handlePressEnterToSubmit}
          ref={confirmPasswordRef}
        />
        <button type="button" ref={buttonRef} onClick={handleSubmit}>
          Create
        </button>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
