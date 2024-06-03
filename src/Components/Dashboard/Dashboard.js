import React, { useEffect, useState, useContext } from "react";
import "./Dashboard.css";
import DashboardDropdown from "../DashboardDropdown/DashboardDropdown";
import Footer from "../Footer/Footer";
import logo from "../Assets/logo.svg";
import dashboard__Illustration from "../Assets/dashboard__Illustration.svg";
import axios from "axios";
import { UserContext } from "../../userContext";
import { useHistory } from "react-router-dom";

// import AdSense from "react-adsense";

const Dashboard = () => {
  let history = useHistory();

  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);

  const getRegNumber = (user) => {
    if (user) {
      const name = user.displayName;
      const nameElementsArray = name.split(" ");
      const regNumber = nameElementsArray[nameElementsArray.length - 1];
      return regNumber;
    }
    return "";
  };

  const [studentDetails, setStudentDetails] = useState({});

  const [roommatesDetails, setRoommatesDetails] = useState([]);

  const updateStudentAndRoommatesDetails = (res) => {
    setStudentDetails((prevStudentDetails) => res.data.student);
    setRoommatesDetails((prevState) => res.data.studentRoommates);
  };

  useEffect(() => {
    if (user && user.accessToken.length !== 0 && user.accessToken) {
      setStudentDetails({
        name: user.displayName,
        regNumber: getRegNumber(user),
        email: user.email,
        phoneNumber: "",
        block: "",
        roomNumber: "",
      });
      axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}dashboard`, {
          email: user.email,
        })
        .then((res) => {
          updateStudentAndRoommatesDetails(res);
        })
        .catch((error) => console.log(error));
    } else history.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <section>
      <div className="dashboard__Header">
        <div className="dashboard__HeaderContentContainer">
          <div className="dashboard__HeaderText">
            <img src={logo} alt="logo" className="dashboard__Logo" />
            <h1 className="dashboard__HeaderH1">
              Got your room details but don't know who's your room mate ?
            </h1>
          </div>
          <div className="dashboard__HeaderIllustrationContainer">
            <img
              src={dashboard__Illustration}
              alt="Dashboard Illustration"
              className="dashboard__HeaderIllustration"
            />
          </div>
        </div>
      </div>

      <div className="dashboard__Content">
        <h1 className="dashboard__ContentH1">Hey {studentDetails?.name}!</h1>
        <p className="dashboard__ContentP">
          <span className="dashboard__ContentSpan">Mail ID: </span>
          {studentDetails.email}
        </p>
        <p className="dashboard__ContentP">
          <span className="dashboard__ContentSpan">Phone: </span>
          {studentDetails.phoneNumber}
        </p>
        <p className="dashboard__ContentP">
          <span className="dashboard__ContentSpan">Room Details: </span>
          {studentDetails.block} Block, Room - {studentDetails.roomNumber}
        </p>

        <h2 className="dashboard__ContentH2">Your Roommates</h2>
      </div>

      {roommatesDetails.length > 0 ? (
        roommatesDetails.map((details) => (
          <div className="dashboard__DropdownContainer">
            <DashboardDropdown
              roommateName={details.name}
              roommateEmail={details.email}
              roommatePhone={details.phoneNumber}
            />
          </div>
        ))
      ) : (
        <div className="dashboard__DropdownContainer">
          <p>Your Roommates are not here yet...</p>
        </div>
      )}

      <div className="dashboard__AboutUs">
        <h1 className="dashboard__AboutUsH1">About Us</h1>
        <p className="dashboard__AboutUsP">
          VITrendz is cofounded by a group of individuals who strive to make
          lives at VIT easier. It is an organization that helps students at VIT
          by providing them various services and academic resources. It provides
          entertainment, study materials, interactive help and a vast stream of
          other facilities to VITians based on their changing requirements.
        </p>
      </div>

      <Footer />
    </section>
  );
};

export default Dashboard;
