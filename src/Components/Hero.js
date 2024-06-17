import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Hero = ({
  text,
  loginStatus,
  setLoginStatus,
  showLogout,
  setShowLogout,
  user,
}) => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    setShowLogout(true);
    // const myUser = { user };
    navigate("/account-info");
  };

  const handleLogoutClick = () => {
    setLoginStatus(false);
    setShowLogout(false);
    navigate("/");
    window.location.reload();
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleAboutClick = () => {
    navigate("/about");
  };

  return (
    <div>
      <div className="top">
        <header className="text-white p-5 hero-container">
          <img
            className="logo"
            src={logo}
            alt="logo"
            height={70}
            width={200}
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          />
          <div className="hero-text">{text}</div>
          <div className="links">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <div
                  className="ablink"
                  aria-current="page"
                  style={{ cursor: "pointer" }}
                  onClick={handleAboutClick}
                >
                  About Us
                </div>
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
    </div>
  );
};

export default Hero;
