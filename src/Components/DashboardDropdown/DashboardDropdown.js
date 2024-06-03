import React, { useState } from "react";
import "./DashboardDropdown.css";
import dropdownIcon from "../Assets/dashboard__DropdownIcon.svg";

const DashboardDropdown = (props) => {
  const [toggleBool, setToggleBool] = useState(false);
  const [dropdownContentStyle, setDropdownContentStyle] =
    useState("dropdownToggleOff");
  const [dropdownIconStyle, setDropdownIconStyle] = useState("dropdownIconOff");
  const clickHandler = () => {
    if (toggleBool === false) {
      setDropdownContentStyle("dropdownToggleOn");
      setDropdownIconStyle("dropdownIconOn");
      setToggleBool(true);
    } else if (toggleBool === true) {
      setDropdownContentStyle("dropdownToggleOff");
      setDropdownIconStyle("dropdownIconOff");
      setToggleBool(false);
    }
  };

  return (
    <div className="dropdownContainer">
      <div className="dropdownToggle" onClick={clickHandler}>
        <img src={dropdownIcon} alt="alt" className={dropdownIconStyle} />
        <h1 className="dropdown__H1">{props.roommateName}</h1>
      </div>
      <div className={dropdownContentStyle}>
        <p className="dropdown__P">
          <span className="dropdown__Span">Mail ID: </span>
          {props.roommateEmail}
        </p>
        <p className="dropdown__P">
          <span className="dropdown__Span">Phone: </span>
          {props.roommatePhone}
        </p>
      </div>
    </div>
  );
};

export default DashboardDropdown;
