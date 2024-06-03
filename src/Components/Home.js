import Hero from "./Hero";

const Home = ({ loginStatus, setLoginStatus, showLogout, setShowLogout }) => {
  return (
    <>
      <Hero
        text="Health Insurance"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
      />
    </>
  );
};

export default Home;
