import React from "react";
import "./Footer.css";
import youtube_icon from "../../assets/youtube_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import instagram_icon from "../../assets/instagram_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={youtube_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={facebook_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gifts cards</li>
        <li>Media centre</li>
        <li>Invester Relations</li>
        <li>Jobs</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Legal Notices</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">© 2003-2024 CineTrove, Srujan0821.</p>
    </div>
  );
};

export default Footer;
