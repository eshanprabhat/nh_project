import Hero from "../Hero";
import axios from "axios";
// import one from "../Images/user-member-avatar-face-profile-icon-vector-22965342.jpg";
import moment from "moment";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Footer from "../../utils/Footer";
const AccountDetails = () => {
  const navigate = useNavigate();
  const [myUser, setMyUser]=useState(null);
  const [loginStatus, setLoginStatus]=useState(null);
  const [user, setUser]=useState(null);
useEffect(()=>{
    const loginStatus = sessionStorage.getItem("loginStatus");
    setLoginStatus(loginStatus);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  },[])
    useEffect(()=>{
      if (user && user._id){
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/users/${user._id}`);
          setMyUser(response.data.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
    },[loginStatus, navigate, user]);
    if (!user) {
      return <CircularProgress />;
    }
  console.log("AccountDetails:", user);
  let formattedDate = moment(user.date).format("MMMM Do YYYY, h:mm:ss a");
  if (!myUser) {
    return <CircularProgress />;
  }
  return (
    <>
      <Hero
        text="Account details"
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{padding:"60px"}} />
      <div className="container">
        <img className="image-3" src={require(`../../images/users/${myUser.photo}`)} alt="Profile" />
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
          <Footer />
    </>
  );
};
export default AccountDetails;
