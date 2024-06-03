import Hero from "./Hero";
const Account = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
}) => {
  return (
    <Hero
      text="My Account"
      loginStatus={loginStatus}
      setLoginStatus={setLoginStatus}
      showLogout={showLogout}
      setShowLogout={setShowLogout}
    />
  );
};

export default Account;
