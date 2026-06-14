import "./HomePage.css";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import useLocalStorage from "./custom hook/LocalStorageHook";

export default function HomePage() {
  const [theme, setTheme] = useLocalStorage("Theme", false);
  return (
    <div className={theme ? "body" : "light"}>
      <button
        className={
          theme
            ? "themeButtonColorDark buttonPress"
            : "themeButtonColorLight buttonPress"
        }
        onClick={() => {
          setTheme(!theme);
        }}
        type="button"
      >
        {theme ? <Moon /> : <Sun />}
      </button>
      <h1>What are you buying from us Today?</h1>
      <div className="buttons">
        <button
          className={theme ? "button buttonPress" : "buttonLight buttonPress"}
        >
          I will
        </button>
        <button
          className={theme ? "button buttonPress" : "buttonLight buttonPress"}
        >
          I won't
        </button>
      </div>
    </div>
  );
}
