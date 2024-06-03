import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./firebase";
import UserContextProvider from "./userContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
