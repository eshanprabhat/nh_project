import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SignUpIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReviewsIcon from '@mui/icons-material/Reviews';
import QuizIcon from '@mui/icons-material/Quiz';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function RightTemporaryDrawer({
  loginStatus,
  plansRef,
  reviewsRef,
  faqsRef,
  contactRef,
}) {
  const [state, setState] = React.useState({
    right: false,
  });
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/account-info");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleLogOutClick = () => {
    sessionStorage.removeItem("loginStatus");
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };
  const handleAboutClick = () => {
    navigate("/about");
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogoClick = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
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

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogoClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handlePlansClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Plans" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleReviewsClick}>
            <ListItemIcon>
              <ReviewsIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleFAQsClick}>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="FAQs" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleContactClick}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAboutClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>
      </List>
      {loginStatus ? (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleAccountClick}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogOutClick}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText primary="Log Out" style={{ color: "red" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLoginClick}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignUpClick}>
                <ListItemIcon>
                  <SignUpIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        <DensityMediumIcon />
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
