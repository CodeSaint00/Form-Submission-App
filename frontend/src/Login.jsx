import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState, useRef, useCallback } from "react";
import useForm from "./custom hook/FormHook";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoLoader from "./loader";
import { Eye, EyeOff, Sun, Moon, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    statement,
    setStatement,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
  } = useForm();
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
    setIsLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      console.log(err.message);
      if (err.response.data.message === "invalid Email") {
        setStatement("Incorrect Email or Password");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      }
      if (err.response.data.message === "sign in with google instead") {
        setStatement("Sign in with Google instead");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      }
    } finally {
      setIsLoading(false);
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
        <h2>Login Now!!</h2>
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
                navigate("/");
              } catch (err) {
                console.log(err.message);
              } finally {
                setIsLoading(false);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            size="large"
            text="signin_with"
            shape="rectangular"
            theme="outline"
          />
        </div>
        <p>or</p>
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
          type={showPassword ? "password" : "text"}
          placeholder="Password*"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleNextInput2}
          ref={inputRef2}
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
        {isLoading ? (
          <LogoLoader />
        ) : (
          <button
            type="button"
            ref={buttonRef}
            onClick={handlelogin}
            className="submit"
          >
            Submit
          </button>
        )}
        <p className="accountAction">
          {"Don't have an account?  "}
          <span>
            <Link to="/register">Create One</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
