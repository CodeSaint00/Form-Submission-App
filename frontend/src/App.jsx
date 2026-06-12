import Login from "./Login";
import RegisterAccount from "./RegisterAcount";
import VerifyPage from "./verify";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterAccount />}></Route>
        <Route path="/verify" element={<VerifyPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
