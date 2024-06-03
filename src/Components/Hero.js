import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useState } from "react";

const Hero = ({
  text,
  loginStatus,
  setLoginStatus,
  showLogout,
  setShowLogout,
}) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowLogout(true);
    navigate("/account-info");
  };

  const handleLogoutClick = () => {
    setLoginStatus(false);
    setShowLogout(false);
    navigate("/");
  };

  return (
    <div>
      <header className="sticky-top text-white p-5 hero-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" height={70} width={200} />
        </Link>
        <div className="hero-text">{text}</div>
        <div className="links">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link to="/about" className="ablink" aria-current="page">
                About Us
              </Link>
            </li>
            {loginStatus ? (
              showLogout ? (
                <>
                  <li className="nav-item">
                    <button
                      // to="/"
                      className="acblink"
                      aria-current="page"
                      onClick={handleLogoutClick}
                    >
                      <u>Log Out</u>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      // to="/account-info"
                      className="acblink"
                      aria-current="page"
                      onClick={handleAccountClick}
                    >
                      <u>My Account</u>
                    </button>
                  </li>
                </>
              )
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="ablink login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="ablink signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Hero;
