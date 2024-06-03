import React from "react";
import "./Footer.css";
import trendzLogo from "../Assets/trendzLogo.svg";

const Footer = () => {
  return (
    <section className="footerSection">
      <div className="footer__MobileTrendzLogo">
        <img src={trendzLogo} alt="VITrendz Logo" className="trendzLogo" />
      </div>
      <div className="footer">
        <div className="footer__Logo">
          <img src={trendzLogo} alt="VITrendz Logo" className="trendzLogo" />
        </div>
        <div className="footer__QuickLinks">
          <h1 className="footer__h1">Quick Links</h1>
          <ul>
            <a href="https://vitrendz.com/" target="_blank" rel="noreferrer">
              <li>Homepage</li>
            </a>
            <a
              href="https://groups.vitrendz.com/"
              target="_blank"
              rel="noreferrer"
            >
              <li>Community</li>
            </a>
            <a
              href="https://vitrendz.com/#services"
              target="_blank"
              rel="noreferrer"
            >
              <li>Services</li>
            </a>
            <a
              href="https://vitrendz.com/#contact"
              target="_blank"
              rel="noreferrer"
            >
              <li>About Us</li>
            </a>
          </ul>
        </div>

        <div className="footer__ContactUs">
          <h1 className="footer__h1">Contact Us</h1>
          <a href="mailto:help@vitrendz.tech">help@vitrendz.tech</a>
        </div>
      </div>

      <div className="copyrightSection">
        All Rights Reserved © {new Date().getFullYear()}
      </div>
    </section>
  );
};

export default Footer;
