import Hero from "../Hero";
import one from "../Images/user-member-avatar-face-profile-icon-vector-22965342.jpg";
import moment from "moment";
const AccountDetails = ({
  showLogout,
  setShowLogout,
  loginStatus,
  setLoginStatus,
  user
}) => {
  setLoginStatus(true);
  console.log("AccountDetails:", user);
  let formattedDate = moment(user.date).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <>
      <Hero
        text="Account details"
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user}
      />
      <div>
        <img className="image-3" src={one} alt="Profile" />
        <div className="aser">
          <div className="asdf"><u>Personal Details:</u></div>
          <div style={{ padding: "5px" }}></div>
          <div className="aqwe">
            <span className="asdf">Name:</span>
            <span className="awer">{user.name}</span>
          </div>
          <div style={{ padding: "10px" }}></div>
          <div className="aqwe">
            <span className="asdf">Phone Number:</span>
            <span className="awer">{user.phoneNumber}</span>
          </div>
          <div style={{ padding: "10px" }}></div>
          <div className="aqwe">
            <span className="asdf">Email-ID:</span>
            <span className="awer">{user.email}</span>
          </div>
          <div style={{ padding: "10px" }}></div>
          <div className="asdf"><u>Account Details:</u></div>
          <div className="aqwe">
            <span className="asdf">Created On:</span>
            <span className="awer">{formattedDate}</span>
          </div>
          <div style={{ padding: "50px" }}></div>
        </div>
      </div>
    </>
  );
};
export default AccountDetails;
