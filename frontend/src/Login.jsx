import { Link } from "react-router-dom";
import "./Login.css";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = useEffect(() => {
    
  }, [])

  return (
    <div>
      <form action="">
        <h2>Login Now!!</h2>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        <p>
          Don't have an account
          <span>
            <Link to="/register"> Create One</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
