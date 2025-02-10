import React from "react";
import "../styles/aboutUs.css";

const AboutUs = () => {
  const details = [
    { title: "Email", value: "info@flatmatrix.com" },
    { title: "Phone", value: "+91 123 456 7890" },
    { title: "Location", value: "Hinjewadi, Pune, India" },
  ];
  return (
    <div className="about-container-wrapper">
      <div className="about-container login-card">
        <div className="about-left-side">
          <span>Contact-Us</span>
          <span>We're here to help you find your perfect home.</span>
          <button className="about-email-btn search-btn">
            <span className="about-email-btn-icon"></span> Send us an Email
          </button>
        </div>
        <div className="about-right-side-container-wrapper">
          {details.map((item) => (
            <div className="about-right-side-container">
              <span className={`about-right-side-${item.title}-icon`}></span>
              <div className="about-right-side">
                <span>{item.title}</span>
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
