import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState, useRef, useCallback } from "react";
import useForm from "./custom hook/FormHook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { email, setEmail, password, setPassword } = useForm();
  const [statement, setStatement] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      setStatement("**Both fields are required");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
      if (err.response.status === 401) {
        setStatement("Incorrect Email");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      }
    }
  };

  const inputRef = useRef();
  const inputRef2 = useRef();
  const buttonRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleNextInput = (e) => {
    if (e.key === "Enter") {
      inputRef2.current.focus();
      buttonRef.current.blur();
    }
  };
  const handleNextInput2 = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.focus();
    }
  };
  return (
    <div>
      <form action="">
        <h2>Login Now!!</h2>
        <span className="statement">{statement}</span>
        <input
          type="text"
          placeholder="Email*"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={handleNextInput}
          ref={inputRef}
        />
        <input
          type="password"
          placeholder="Password*"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleNextInput2}
          ref={inputRef2}
        />
        <button type="button" ref={buttonRef} onClick={handlelogin}>
          Submit
        </button>
        <p>
          Don't have an account?
          <span>
            <Link to="/register"> Create One</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
