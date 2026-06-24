import "./HomePage.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoLoader from "./loader";
import {
  Sun,
  Moon,
  Search,
  MapPin,
  Banknote,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import useLocalStorage from "./custom hook/LocalStorageHook";

export default function HomePage() {
  const [theme, setTheme] = useLocalStorage("Theme", false);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchedResult, setSearchedResult] = useState(false);

  const pressEnterToSearch = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };
  const fetchSearchedJobs = async () => {
    inputRef.current.blur();
    try {
      setLoading(true);
      const result = await axios.get("http://localhost:3000/search", {
        params: { search },
      });
      setJobs(result.data);
      setSearchedResult(false);
    } catch (err) {
      console.log(err.message);
      if (err.response?.status === 404) {
        setSearchedResult(true);
        console.log("nothing found");
      } else {
        setSearchedResult(false);
        console.log("button pressed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const Jobs = await axios.get("http://localhost:3000/search");
        setJobs(Jobs.data);
        setSearchedResult(false);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
      <br />
      <br />
      <h1>Get Employed in Minutes</h1>
      <main className="searchInput">
        <input
          className={theme ? "nothing" : "searchTextbox"}
          type="text"
          placeholder="Search Job Name or Location"
          onKeyDown={pressEnterToSearch}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          ref={inputRef}
        />
        <button
          type="button"
          className="searchButton"
          onClick={fetchSearchedJobs}
          ref={buttonRef}
        >
          <Search />
        </button>
      </main>
      <br />
      <br />
      <section className="Jobs">
        {loading ? (
          <LogoLoader />
        ) : searchedResult ? (
          <h2>{`Results for ${search} Not Found`}</h2>
        ) : (
          jobs.map((job) => (
            <main key={job._id}>
              <h2>{job.jobTitle}</h2>
              <ul>
                <li>
                  <span className="jobSpan">
                    <MapPin /> {job.location}
                  </span>
                </li>
                <li>
                  <span className="jobSpan">
                    <Banknote />
                    {job.salary}
                  </span>
                </li>
                <li>
                  <span className="jobSpan">Jobtype: {job.jobType}</span>
                </li>
                <li>
                  <span className="jobSpan">
                    <a href={job.applyLink} target="_blank" rel="noreferrer">
                      <ExternalLink />
                      {job.applyLink}
                    </a>
                  </span>
                </li>
              </ul>
            </main>
          ))
        )}
      </section>
    </div>
  );
}
