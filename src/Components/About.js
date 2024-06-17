import Hero from "./Hero";
const About = ({ loginStatus, setLoginStatus, showLogout, setShowLogout,user }) => {
  setShowLogout(false);
  return (
    <>
      <Hero
        text="About Us"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
    </>
  );
};
export default About;
