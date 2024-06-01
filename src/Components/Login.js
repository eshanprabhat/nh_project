import React, { useState } from "react";
import second from "./Images/Firefly Health Insurance 82230.jpg";
import one from "./Images/Screenshot 2024-05-30 at 3.27.15 PM.png";
import three from "./Images/Firefly Health Insurance 65632.jpg";
import two from "./Images/download.png";
import logo from "./Images/Narayana_Health_Logo.jpg";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase"; // Import the initialized auth
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(true);
  // const [confirmationResult, setConfirmationResult] = useState(null);

  const handleInputChange = (value) => {
    setPhoneNumber(value);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Captcha Verified!!");
        },
      });
    }
  };
  const onSignInSubmit = () => {
    const appVerifier = window.recaptchaVerifier;
    const formattedPhoneNumber = `+${phoneNumber}`;
    signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.log("SMS not sent", error);
      });
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(`+${phoneNumber}`);
    setupRecaptcha();
    setShowOTP(false);
    onSignInSubmit();
  };

  const handleOtpChange = (value) => {
    setOTP(value);
  };

  // const handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   if (confirmationResult) {
  //     confirmationResult
  //       .confirm(otp)
  //       .then((result) => {
  //         const user = result.user;
  //         console.log("User signed in successfully:", user);
  //       })
  //       .catch((error) => {
  //         console.log("OTP verification failed", error);
  //       });
  //   }
  // };

  return (
    <div className="page">
      <div className="first">
        <div className="login-details">
          <img className="filtered" src={logo} alt="logo" />
          {showOTP ? (
            <>
              <div className="text-1">Log-in using your Mobile Number</div>
              <div id="sign-in-button"></div>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleInputChange}
                // containerClass="input"
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
          ) : (
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
              <button
                type="button"
                className="ebtn"
                // onClick={handleOtpSubmit}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
      <div className="second">
        <img src={second} alt="" />
        <div className="container text-center erty">
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