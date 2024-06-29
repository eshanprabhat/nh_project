import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RightTemporaryDrawer from "./../utils/Drawer";

const Hero = ({ text, loginStatus, showLogout,setLoginStatus,setShowLogout }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleAboutClick = () => {
        navigate("/about");
      };
  const handleAccountClick = () => {
    navigate("/account-info");
  };
  const handleLogoutClick = () => {
    setLoginStatus(false);
    setShowLogout(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div class="d-flex align-items-center hero-container">
        <div class="p-2">
          <img
            src={logo}
            alt="logo"
            height={70}
            width={200}
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          />
        </div>
        <div class="p-2 flex-grow-1 hero-text">
          {text}
        </div>
        <div className="links buttons">
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
        <div class="p-2 drawer">
          <RightTemporaryDrawer loginStatus={loginStatus} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
