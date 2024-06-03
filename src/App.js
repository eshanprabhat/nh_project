import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { useState, React } from "react";
import Account from "./Components/Account";
function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              showLogout={showLogout}
              setShowLogout={setShowLogout}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
              showLogout={showLogout}
              setShowLogout={setShowLogout}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/signup"
          element={<Signup setLoginStatus={setLoginStatus} />}
        />
        <Route
          path="/account-info"
          element={
            <Account
              showLogout={showLogout}
              setShowLogout={setShowLogout}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
