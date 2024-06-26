import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import RightTemporaryDrawer from "./../utils/Drawer";

const Hero = ({ text, loginStatus }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
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
        <div class="p-2 flex-grow-1 hero-text" onClick={handleLogoClick}>
          {text}
        </div>
        <div class="p-2">
          <RightTemporaryDrawer loginStatus={loginStatus} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
