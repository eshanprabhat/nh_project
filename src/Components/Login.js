import React, { useState,useEffect } from "react";
import second from "./Images/Firefly Health Insurance 82230.jpg";
import one from "./Images/Screenshot 2024-05-30 at 3.27.15 PM.png";
import two from "./Images/download.png";
import three from "./Images/Firefly Health Insurance 65632.jpg";
import logo from "./Images/Narayana_Health_Logo.jpg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [users, setUsers] = useState([]);
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const location = useLocation();
  const { plan } = location.state || {};
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data.data.users);
    };
    fetchUsers();
  }, []);
  const handleInputChange = (value) => {
    setPhoneNumber(value);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          console.log("Captcha Verified!");
        },
      });
    }
  };

  const onSignInSubmit = () => {
    const formattedPhoneNumber = `+${phoneNumber}`;
    console.log(`Formatted Phone Number: ${formattedPhoneNumber}`);
    const appVerifier = window.recaptchaVerifier;

    // const auth = getAuth();
    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setConfirmationResult(confirmationResult);
        console.log("SMS sent Successfully!!");
        // ...
      })
      .catch((error) => {
        console.log("SMS Not sent", error);
        // Error; SMS not sent
        // ...
      });
  };
  const handlePhoneNumberVerification = (phoneNumber) => {
    const user = users.find((el) => el.phoneNumber === phoneNumber);
    return new Promise((resolve) => {
      if (!user) {
        console.log("User not Verified!");
        alert("User Not Registered! Try a different number or Sign Up");
        resolve(false); // Set allowSignIn to false and resolve promise
      } else {
        console.log("User Verified!");
        resolve(true); // Set allowSignIn to true and resolve promise
      }
    });
  };
  const handleButtonClick = async (e) => {
    e.preventDefault();
    const formatted = `+${phoneNumber}`;
    console.log(formatted);
    const isVerified = await handlePhoneNumberVerification(formatted); // Wait for verification to complete
    if (isVerified) {
      setupRecaptcha();
      setShowOTP(true);
      onSignInSubmit();
    }
  };

  const handleOtpChange = (value) => {
    setOTP(value);
  };
  const getUser = (phoneNumber) => {;
    const user = users.find((el) => el.phoneNumber === phoneNumber);
    return user;
  };
  const formatted = `+${phoneNumber}`;
  const myUser = getUser(formatted);


  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user;
          console.log("User signed in successfully:", user);
          sessionStorage.setItem("showSnackbar", "true");
          sessionStorage.setItem("loginStatus", "true");
          sessionStorage.setItem("user", JSON.stringify(myUser));
          if(plan){
            navigate("/plan-patient",{state:{plan}});
          }else{
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("OTP verification failed", error);
          alert("Invalid OTP!");
        });
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
                Log In
              </button>
            </>
          ) : (
            <>
              <div className="text-1">Log-in using your Mobile Number</div>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Mobile Number"
                inputClass="form-control"
                buttonClass="flag-dropdown"
                dropdownClass="country-list"
              />
              <div style={{ padding: "20px" }}></div>
              <button
                type="button"
                className="ebtn"
                onClick={handleButtonClick}
              >
                Send OTP
              </button>
              <div className="text-2">
                Haven't Registered Yet?{" "}
                <Link to="/signup">
                  <b>
                    <u>Sign Up</u>
                  </b>
                </Link>
              </div>
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

export default Login;
