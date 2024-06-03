import React, { useState, useEffect, useContext } from "react";
import "./Landing.css";
import logo from "../Assets/logo.svg";
import Landing__illustration from "../Assets/landing__Illustration.svg";
import LandingLogin from "../LandingLogin/LandingLogin";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";

import { UserContext } from "../../userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const Landing = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [u, setU] = useState(auth.currentUser);
  // let bool = true;
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    let userData = {};

    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        userData = { accessToken: "xyz" };
        setU((prev) => userData);
      } else {
        userData = {
          accessToken: userFound.accessToken,
          displayName: userFound.displayName,
          email: userFound.email,
        };
        setU(userData);
      }
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState("landing__modal-hidden");

  const userLoginClickHandler = () => {
    setShowModal("landing__modal-show");
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}login`)
      .catch((err) => console.log(err));
  };

  // const goBackClickHandler = () => {
  //   setShowModal("landing__modal-hidden");
  // };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}dashboard`, {
        email: user.email,
      })
      .then((res) => {
        if (res.data.success === true) {
          setUserExists(true);
        }
        if (res.data.success === false) {
          setUserExists(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userExists === true ? (
        <Dashboard />
      ) : (
        <>
          <section>
            <div className="landing__Container">
              {/* Start Left Div */}
              <div className="landing__Content">
                <div style={{ paddingLeft: "2rem" }}>
                  <img src={logo} alt="logo" className="landing__Logo" />
                  <h1 className="landing__h1">
                    Got your room details but don't know who's your room mate ?
                  </h1>
                  <h2 className="landing__h2">
                    Find your Roommate in 3 steps:
                  </h2>
                  <ol>
                    <li>Signup with VIT Email ID</li>
                    <li>Enter room details</li>
                    <li>Voila! Get your room mate details</li>
                  </ol>
                </div>

                <div className="landing__LoginMobile">
                  <LandingLogin onClickUserLogin={userLoginClickHandler} />
                </div>

                <div>
                  <img
                    src={Landing__illustration}
                    alt="Landing Page Illustration"
                    className="landing__Illustration"
                  />
                  <p className="landing__P">
                    We assure you that your personal data will be safe with us
                    and will be end-to-end encrpyted to prevent any misuse
                  </p>
                </div>
              </div>

              <div className="landing__Login">
                <LandingLogin onClickUserLogin={userLoginClickHandler} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Landing;
