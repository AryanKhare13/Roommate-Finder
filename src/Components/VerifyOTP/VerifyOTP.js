import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./VerifyOTP.css";
import Modal from "../Modal/Modal";
//import Landing from "../Landing/Landing";

const VerifyPage = () => {
  const [OTP, setOTP] = useState(null);

  const otpChangeHandler = (e) => {
    setOTP(e.target.value);
  };

  let history = useHistory();

  const otpSubmitHandler = (e) => {
    e.preventDefault();
    axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}verify`, { OTP })
        .then((res) => {
            if (res.data.success) {
                history.push('/dashboard');
            } else {
                setOTP('');
                alert('Incorrect OTP');
            }
        })
        .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="otp-page-container">
        {/* <section>
          <Landing />
        </section> */}
        <Modal>
          <div>
            <form onSubmit={otpSubmitHandler}>
              <p className="otp-message">
                We've sent you an email containing an OTP for account
                verification purpose. Please enter the OTP and click on verify.
                If not recieved, check your Spam folder as well.
              </p>
              <label className="otp-label">Enter the OTP</label>
              <input
                type="number"
                className="otp-input"
                name="OTP"
                value={OTP}
                onChange={otpChangeHandler}
              />
              <button className="otp__SubmitBtn" type="submit">
                Verify OTP
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default VerifyPage;
