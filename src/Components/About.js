import Hero from "./Hero";
import { useLocation } from "react-router-dom";
const About = ({ loginStatus, setLoginStatus, showLogout, setShowLogout }) => {
  setShowLogout(false);
  const location = useLocation();
  const { myUser } = location.state || {};
  return (
    <>
      <Hero
        text="About Us"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={myUser}
      />
    </>
  );
};
export default About;
