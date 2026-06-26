import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoLoader from "./loader";
import useForm from "./custom hook/FormHook";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterAccount() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    setIsLoading,
    statement,
    setStatement,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useForm();
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    if (password !== confirmPassword) {
      setStatement("**Passwords must be desame");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    if (!emailRegex.test(email)) {
      setStatement("Invalid Email");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    setIsLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/register",
        {
          username,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true },
      );
      console.log("request succeeded, navigating...");
      navigate("/verify", { state: { email: email } });
    } catch (err) {
      console.log(err.message);
      if (err.response.data.message === `${email} already exists`) {
        setStatement("Email already exists");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      }
    } finally {
      setIsLoading(false);
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
      confirmPasswordRef.current.blur();
    }
  };

  return (
    <div className="loginBody">
      <button
        className="backArrow"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft />
      </button>
      <form action="">
        <h2>Register Now</h2>
        <div className="googleContainer">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              setIsLoading(true);
              try {
                const result = await axios.post(
                  "http://localhost:3000/googleLogin",
                  {
                    token: credentialResponse.credential,
                  },
                  { withCredentials: true },
                );
                navigate("/home");
              } catch (err) {
                console.log(err.message);
              } finally {
                setIsLoading(false);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <p>or</p>
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
          type={showConfirmPassword ? "password" : "text"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePressEnterToConfirmPassword}
          ref={passwordRef}
        />
        <input
          type={showPassword ? "password" : "text"}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handlePressEnterToSubmit}
          ref={confirmPasswordRef}
        />
        <button
          type="button"
          className="eye"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
        <button
          type="button"
          className="eye1"
          onClick={() => {
            setShowConfirmPassword(!showConfirmPassword);
          }}
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>
        {isLoading ? (
          <LogoLoader />
        ) : (
          <button type="button" ref={buttonRef} onClick={handleSubmit}>
            Create
          </button>
        )}
        <p className="accountAction">
          {"Already have an account?  "}
          <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
