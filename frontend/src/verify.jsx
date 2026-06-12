import React, { useState, useEffect, useRef } from "react";
import useForm from "./custom hook/FormHook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./verify.css";
import axios from "axios";

export default function VerifyPage() {
  const { statement, setStatement, code, setCode } = useForm();
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const codeRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    codeRef.current.focus();
  }, []);

  const pressEnterToVerify = (e) => {
    if (e.key === "Enter") {
      codeRef.current.blur();
      buttonRef.current.click();
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    if (code === "") {
      setStatement("**Input a 6-digit code");
      setTimeout(() => {
        setStatement("");
      }, 4000);
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/verify", {
        code,
        email,
      });
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      if (err.response.data.message === `user does not exist`) {
        setStatement("user does not exist");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      } else if (err.response.data.message === `${code} expired`) {
        setStatement("Code has expired");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      } else if (err.response.data.message === `${code} is not desame`) {
        setStatement("code does not match");
        setTimeout(() => {
          setStatement("");
        }, 4000);
      }
    }
  };
  return (
    <div>
      <form action="">
        <h1>Email Verification</h1>
        <p>
          A 6-digit code has been sent to{" "}
          <strong>
            <em>{email}</em>
          </strong>{" "}
          input it in the space provided below.{" "}
          <span>The code expires in 10minutes</span>
        </p>
        <input
          type="text"
          placeholder="6-digit Code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            onkeydown = { pressEnterToVerify };
          }}
          ref={codeRef}
        />
        <span className="statement">{statement}</span>
        <button type="" ref={buttonRef} onClick={handleVerify}>
          verify
        </button>
        <p className="resend">
          Code expired? <Link to="/register">Resend it</Link>
        </p>
      </form>
    </div>
  );
}
