import Hero from "./Hero";
const About = ({ loginStatus, setLoginStatus, showLogout, setShowLogout }) => {
  return (
    <>
      <Hero
        text="About Us"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
      />
    </>
  );
};
export default About;
