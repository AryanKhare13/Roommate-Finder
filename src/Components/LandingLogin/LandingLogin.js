import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingLogin.css";
import googleLogo from "../Assets/landing__Google.svg";
import googleBtnLogo from "../Assets/google-btn-icon.svg";
import { UserContext } from "../../userContext";
import axios from "axios";

import "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

const LandingLogin = () => {
  let history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");

  const emailRegex = (input) => {
    let regex = /([a-zA-Z]+(\.[a-zA-Z]+)+)[0-9a-zA-Z]+@vitstudent\.ac\.in/gm;
    return regex.test(input);
  };

  const userExists = (email) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}dashboard`, { email })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          history.push("/dashboard");
        }
        if (res.data.success === false) {
          history.push("/signup");
        }
      })
      .catch((error) => console.log(error));
  };

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, accessToken } = result.user;
        const isEmailValid = emailRegex(email);

        if (isEmailValid) {
          setErrorMsg("");
          // TODO - remove set user from here and fo it after signup
          setUser({
            accessToken,
            displayName,
            email,
          });

          userExists(email);
        } else {
          setErrorMsg("Please enter VIT email Id");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="landing__LoginContainer">
        <div className="landing__LoginContent">
          <img
            src={googleLogo}
            alt="Google Login"
            className="landing__LoginGoogle"
          />
          <p className="landing__LoginP">Sign in with your VIT mail ID</p>

          {/* <button className="landing__SignInBtn" onClick={loginClickHandler}>
          Login
        </button>
        <Link to="/signup">
          <button className="landing__SignInBtn">Sign Up</button>
        </Link> */}
          <button className="landing__SignInBtn" onClick={signIn}>
            <img
              src={googleBtnLogo}
              alt="Google"
              style={{ marginRight: "0.4rem" }}
            />
            Login with Google
          </button>
          <p className="red">{errorMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default LandingLogin;
