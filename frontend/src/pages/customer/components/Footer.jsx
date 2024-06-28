import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import for icons
import {
  faTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p className="copyright">
            &copy; {new Date().getFullYear()} shopFUSION
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
