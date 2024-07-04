import React, { useState } from "react";
import second from "./Images/Firefly Health Insurance 82230.jpg";
import one from "./Images/Screenshot 2024-05-30 at 3.27.15 PM.png";
import three from "./Images/Firefly Health Insurance 65632.jpg";
import two from "./Images/download.png";
import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate, Link,useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";

const Signup = () => {
  const location = useLocation();
  const { plan } = location.state || {};
  const [mobileNumber, setmobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOTP] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Verified!");
        },
      });
    }
  };

  const onSignInSubmit = async () => {
    const formattedmobileNumber = `+${mobileNumber}`;
    console.log(`Formatted Phone Number: ${formattedmobileNumber}`);
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, formattedmobileNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setConfirmationResult(confirmationResult);
        console.log("SMS sent Successfully!!");
      })
      .catch((error) => {
        console.log("SMS Not sent", error);
      });
  };

  const handleInputChangeM = (value) => {
    setmobileNumber(value);
  };
  const handleInputChangeN = (event) => {
    setName(event.target.value);
  };
  const handleInputChangeE = (event) => {
    setEmail(event.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(`+${mobileNumber}`);
    setupRecaptcha();
    setShowOTP(true);
    onSignInSubmit();
  };

  const handleOtpChange = (value) => {
    setOTP(value);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (confirmationResult) {
      try {
        const result = await confirmationResult.confirm(otp);
        const user = result.user;
        console.log("User signed in successfully", user);
        const phoneNumber = `+${mobileNumber}`;
        const date = new Date();
        const response = await axios.post("https://nh-project.onrender.com/api/users", {
          name,
          phoneNumber,
          email,
          date,
        });
        sessionStorage.setItem("showSnackbar", "true");
        sessionStorage.setItem("loginStatus", "true");
        sessionStorage.setItem("user", JSON.stringify(response.data.data.user));
        if(plan){
          navigate("/plan-patient",{state:{plan}});
        }else{
          navigate("/");
        }
      } catch (error) {
        console.error("OTP verification failed", error);
        alert("Invalid OTP!");
      }
    }
  };

  return (
    <div className="page">
      <div className="first">
        <div className="login-details">
          <img className="filtered" src={logo} alt="logo" />
          <div id="sign-in-button"></div>
          {showOTP ? (
            <>
              <div className="text-1">
                Enter the OTP sent to your Mobile Number
              </div>
              <OtpInput
                value={otp}
                onChange={handleOtpChange}
                OTPLength={6}
                isInputNum
                shouldAutoFocus
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "2rem",
                  borderRadius: 4,
                  border: "2px solid #304D7A",
                }}
                containerStyle={{ justifyContent: "center" }}
              />
              <div style={{ padding: "20px" }}></div>
              <button type="button" className="ebtn" onClick={handleOtpSubmit}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="text-1">Enter Your Name:</div>
              <input
                className="input"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={handleInputChangeN}
              />
              <div style={{ padding: "5px" }}></div>
              <div className="text-1">Enter Mobile Number:</div>
              <PhoneInput
                country={"in"}
                value={mobileNumber}
                onChange={handleInputChangeM}
                inputClass="form-control"
                buttonClass="flag-dropdown"
                dropdownClass="country-list"
              />
              <div style={{ padding: "5px" }}></div>
              <div className="text-1">Enter Email Id:</div>
              <input
                className="input"
                type="text"
                placeholder="Email ID"
                value={email}
                onChange={handleInputChangeE}
              />
              <div style={{ padding: "20px" }}></div>
              <button
                type="button"
                className="ebtn"
                onClick={handleButtonClick}
              >
                Sign Up
              </button>
              <div className="text-2">
                Already Registered?{" "}
                <Link to="/login">
                  <b>
                    <u>Log In</u>
                  </b>
                </Link>
              </div>
              <div style={{ padding: "30px" }}></div>
            </>
          )}
        </div>
      </div>
      <div className="second">
        <img src={second} alt="" />
        <div className="text-center erty">
          <div className="row">
            <div className="col one">
              <img src={one} alt="one" />
              <div>Register Patients</div>
            </div>
            <div className="col two">
              <img src={two} alt="two" />
              <div>Manage Plans</div>
            </div>
            <div className="col three">
              <img src={three} alt="three" />
              <div>Secure Health</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
