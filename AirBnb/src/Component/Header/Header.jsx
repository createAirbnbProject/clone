import React from "react";
import "../../CSS/header.css";
import { SlGlobe } from "react-icons/sl";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="HeaderMainContainer">
      <div className="HeaderChild">
        <div>
          <Link to="/">
            <img
              src="https://download.logo.wine/logo/Airbnb/Airbnb-Logo.wine.png"
              alt=""
              className="image_logo"
            />
          </Link>
        </div>
        <div className="mainHeader">
          <div>Homes</div>
          <div>Experiences</div>
        </div>
        <div className="LoginSide">
          <div>Airbnb your home</div>
          <div style={{ marginTop: "8px" }}>
            <SlGlobe />
          </div>
          <div>Hello</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
