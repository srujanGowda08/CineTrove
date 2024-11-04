import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/newlogo.png";
import search from "../../assets/search_icon.svg";
import bell from "../../assets/bell_icon.svg";
import profile from "../../assets/profile_img.png";
import caret from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";

const Navbar = () => {
  const navRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="search_icon" className="icons" />
        <p>Children</p>
        <img src={bell} alt="bell_icon" className="icons" />
        <div className="navbar-profile" onClick={toggleDropdown}>
          <img src={profile} alt="profile_img" className="profile" />
          <img src={caret} alt="dropdown" />
          {isDropdownOpen && (
            <div className="dropdown">
              <p
                onClick={() => {
                  logout();
                }}
              >
                Sign out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
