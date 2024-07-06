import logo from "./Images/Narayana_Health_Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import RightTemporaryDrawer from "./../utils/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import avatardefault from "./Images/user-member-avatar-face-profile-icon-vector-22965342.jpg"

const Hero = ({
  user,
  loginStatus,
  showLogout,
  setLoginStatus,
  setShowLogout,
  plansRef,
  reviewsRef,
  faqsRef,
  contactRef,
}) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleAccountClick = () => {
    navigate("/account-info");
  };
  const handleContactClick = () => {
    if (contactRef && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow the page to load first
    }
  };
  const handlePlansClick = () => {
    if (plansRef && plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("plans");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow the page to load first
    }
  };
  const handleReviewsClick = () => {
    if (reviewsRef && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("reviews");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow the page to load first
    }
  };
  const handleFAQsClick = () => {
    if (faqsRef && faqsRef.current) {
      faqsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("faq");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow the page to load first
    }
  };
  const handleLogoutClick = () => {
    setLoginStatus(false);
    setShowLogout(false);
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="d-flex align-items-center hero-container">
        <div className="p-1">
          <img
            src={logo}
            alt="logo"
            height={45}
            width={45}
            style={{ cursor: "pointer" }}
            onClick={handleLogoClick}
          />
        </div>
        <div className="p-1 flex-grow-1">
          <div className="navbar-blocks" onClick={handleLogoClick}>
            Home
          </div>
          <div className="navbar-blocks" onClick={handlePlansClick}>
            Plans
          </div>
          <div className="navbar-blocks" onClick={handleReviewsClick}>
            Reviews
          </div>
          <div className="navbar-blocks" onClick={handleFAQsClick}>
            FAQs
          </div>
          <div className="navbar-blocks" onClick={handleContactClick}>
            Contact
          </div>
          <div className="navbar-blocks" onClick={handleAboutClick}>
            About Us
          </div>
        </div>
        <div className="p-1 buttons">
          <ul className="nav justify-content-end">
            {loginStatus ? (
              showLogout ? (
                <>
                  <li
                    className="nav-item"
                    onClick={handleLogoutClick}
                    style={{ cursor: "pointer", marginRight: "30px" }}
                  >
                    <LogoutIcon
                      fontSize="large"
                      sx={{ color: "red" }}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    />
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Log Out</Typography>
                    </Popover>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="nav-item"
                    style={{ cursor: "pointer", marginRight: "30px" }}
                  >
                    <Avatar
                      alt="avatar"
                      src={user.photo ? user.photo : avatardefault} 
                      onClick={handleAccountClick}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    />
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>My Account</Typography>
                    </Popover>
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
        <div className="p-1 drawer">
          <RightTemporaryDrawer
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
            setShowLogout={setShowLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
