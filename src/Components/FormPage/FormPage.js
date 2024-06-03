import React from "react";
import "./FormPage.css";
import FormPageForm from "../FormPage_Form/FormPage_Form";
import Footer from "../Footer/Footer";
import logo from "../Assets/logo.svg";
import formIllustration from "../Assets/form__Illustration.svg";

const FormPage = () => {
  return (
    <section>
      <div className="form__Container">
        <div className="form__IllustrationBox">
          <img src={logo} alt="Logo" className="form__Logo" />
          <h1 className="form__h1">
            Got your room details but don't know who's your room mate ?
          </h1>

          <div className="form__MobileContent">
            <FormPageForm />
          </div>

          <img
            src={formIllustration}
            alt="Illustration"
            className="form__Illustration"
          />
        </div>
        <div className="form__Content">
          <FormPageForm />
        </div>
      </div>

      {/* <AdSense.Google
        client="ca-pub-3524193275174890"
        slot="4162029724"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "red",
        }}
        format="auto"
        responsive="true"
      // layoutKey="-gw-1+2a-9x+5c"
      /> */}

      <Footer />
    </section>
  );
};

export default FormPage;
