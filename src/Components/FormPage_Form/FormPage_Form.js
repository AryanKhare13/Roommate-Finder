import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./FormPage_Form.css";

import errorSign from "../Assets/errorSign.svg";

import { useHistory } from "react-router-dom";
import "../../firebase";
import { UserContext } from "../../userContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const FormPageForm = () => {
  // eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  // eslint-disable-next-line
  const [u, setU] = useState(auth.currentUser);

  const getRegNumber = (user) => {
    if (user) {
      const name = user.displayName;
      const nameElementsArray = name.split(" ");
      const regNumber = nameElementsArray[nameElementsArray.length - 1];
      return regNumber;
    }
    return "";
  };

  useEffect(() => {
    let userData = {};

    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        userData = { accessToken: "" };
        setU(userData);
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

  const formDataChangeHandler = (e) => {
    setFormData(() => {
      return {
        ...formData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [hostelBlockDropDownType, setHostelBlockDropDownType] =
    useState("Mens");

  const hostelTypeChangeHandler = (e) => {
    if (e.target.value === "Mens") {
      setHostelBlockDropDownType("Mens");
    }
    if (e.target.value === "Ladies") {
      setHostelBlockDropDownType("Ladies");
    }
  };
  const [formData, setFormData] = useState({
    email: user.email,
    // password: '',
    name: user.displayName,
    regNumber: getRegNumber(user),
    roomNumber: "",
    block: "A",
    hostelType: "Mens",
    phoneNumber: "",
  });

  let history = useHistory();

  const emailRegex = (input) => {
    let regex = /([a-zA-Z]+(\.[a-zA-Z]+)+)[0-9a-zA-Z]+@vitstudent\.ac\.in/gm;
    return regex.test(input);
  };

  const validateFormData = (payload) => {
    const emailValid = emailRegex(payload.email);
    const nameValid = payload.name.length > 0 ? true : false;
    const regNumberValid = payload.regNumber.length > 0 ? true : false;
    const blockValid = payload.block.length > 0 ? true : false;
    const hostelTypeValid = payload.hostelType.length > 0 ? true : false;
    const phoneNumberValid = payload.phoneNumber.length >= 0 ? true : false;
    const roomNumberValid = payload.roomNumber.length > 0 ? true : false;
    return (
      emailValid &&
      nameValid &&
      regNumberValid &&
      blockValid &&
      hostelTypeValid &&
      phoneNumberValid &&
      roomNumberValid
    );
  };

  // useEffect(() => {
  //     axios
  //         .post('/signup', { dummy: 'Dummy data' })
  //         .then((res) => {
  //             if (res.data.success && res.data.redirectUrl === '/dashboard') {
  //                 history.push('/dashboard');
  //             } else if (!res.data.success) {
  //                 history.push('/signup');
  //             }
  //         })
  //         .catch((err) => console.log(err));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const submitHandler = (e) => {
    let bool = validateFormData(formData),
      bool1 = true;
    e.preventDefault();

    const changedData = JSON.parse(window.localStorage.getItem("user"));
    if (JSON.stringify(u) !== JSON.stringify(changedData)) {
      bool1 = false;
      setUser(u);
    }

    if (bool && bool1) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_BASE_URL}signup`, formData)
        .then((res) => {
          if (res.data.success) {
            history.replace("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setFormData({
        email: user.email,
        // password: '',
        name: user.displayName,
        regNumber: getRegNumber(user),
        roomNumber: "",
        block: "A",
        hostelType: "Mens",
        phoneNumber: "",
      });
      alert("Data invalid, please fill again with your VIT email only");
    }
  };

  return (
    <section>
      <div className="formPage__Container">
        <div className="errorContainer">
          <img src={errorSign} alt="Warning" className="errorSign" />
          <p className="errorText">
            Kindly fill you details carefully. No modifications will be allowed
          </p>
        </div>
        <div className="form__FormGroup">
          <form onSubmit={submitHandler}>
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Email<span style={{ color: "#FF0000" }}>*</span>
              </label>
              <input
                type="text"
                className="form__Input"
                // onChange={formDataChangeHandler}
                value={user.email}
                name="email"
                required
              />
            </div>
            {/* <div className="form__LabelInputContainer">
                            <label className="form__Label">
                                Password
                                <span style={{ color: '#FF0000' }}>*</span>
                            </label>
                            <input
                                type="password"
                                className="form__Input"
                                onChange={formDataChangeHandler}
                                value={formData.password}
                                name="password"
                                required
                            />
                        </div> */}
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Enter your Name
                <span style={{ color: "#FF0000" }}>*</span>
              </label>
              <input
                type="text"
                className="form__Input"
                // onChange={formDataChangeHandler}
                name="name"
                value={user.displayName}
                required
              />
            </div>
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Enter your Reg No.
                <span style={{ color: "#FF0000" }}>*</span>
              </label>
              <input
                type="text"
                className="form__Input"
                // onChange={formDataChangeHandler}
                name="regNumber"
                value={formData.regNumber}
                required
              />
            </div>
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Enter your Room No.
                <span style={{ color: "#FF0000" }}>*</span>
              </label>
              <input
                type="text"
                className="form__Input"
                onChange={formDataChangeHandler}
                name="roomNumber"
                value={formData.roomNumber}
                required
              />
            </div>
            <div className="form__LabelInputContainer">
              <label className="form__Label">Enter your Phone No.</label>
              <input
                type="tel"
                className="form__Input"
                onChange={formDataChangeHandler}
                name="phoneNumber"
                value={formData.phoneNumber}
              />
            </div>
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Enter your Hostel Type
                <span style={{ color: "#FF0000" }}>*</span>
              </label>
              <select
                className="form__Input"
                style={{ textAlign: "center" }}
                name="hostelType"
                onChange={hostelTypeChangeHandler}
                required
              >
                <option value="Mens">Mens</option>
                <option value="Ladies">Ladies</option>
              </select>
            </div>
            <div className="form__LabelInputContainer">
              <label className="form__Label">
                Enter your Block
                <span style={{ color: "#FF0000" }}>*</span>
              </label>
              {hostelBlockDropDownType === "Mens" ? (
                <select
                  className="form__Input"
                  style={{ textAlign: "center" }}
                  name="block"
                  onChange={formDataChangeHandler}
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="BAnnex">B Annex</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="DAnnex">D Annex</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                  <option value="J">J</option>
                  <option value="K">K</option>
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="N">N</option>
                  <option value="P">P</option>
                  <option value="Q">Q</option>
                  <option value="R">R</option>
                </select>
              ) : (
                <select
                  className="form__Input"
                  style={{ textAlign: "center" }}
                  name="block"
                  onChange={formDataChangeHandler}
                  required
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="EAnnex">E Annex</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                  <option value="H">H</option>
                </select>
              )}
            </div>
            <button type="submit" className="form__SubmitBtn">
              Submit
            </button>
          </form>
        </div>
        <p className="form__P">Your personal details will be encrypted</p>
      </div>
    </section>
  );
};

export default FormPageForm;
