import Hero from "../Hero";

const MyPlans = ({
    showLogout,
    setShowLogout,
    loginStatus,
    setLoginStatus,
    user
  })=>{
return(
    <>
    <Hero
        text="My Plans"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
    </>
)
}
export default MyPlans;