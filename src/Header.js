import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMoon } from "react-icons/fa6";
import { FaSearch, FaBars, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("🇬🇧 English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
      <header className="header flex items-center md:items-start justify-between md:px-20 px-4 pb-2 bg-sky-bg">
        <div className="logo justify-center  w-full md:w-auto">
          <Link to="/">
            <img
              src="https://i.postimg.cc/13JvwsDs/Myapproved-logo.png"
              alt="My Approved Logo"
            />
          </Link>
        </div>
        <button
          className="flex justify-center items-center max-w-[50px] md:hidden text-2xl border border-yellow text-yellow px-2 py-1 rounded-md"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <FaBars />
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-start gap-4 justify-between  right-0">
          <div className="flex flex-col items-center">
            <div className="buttons pt-3 flex gap-3">
              {/* Trade Dropdown */}
              <div className="dropdown flex flex-col gap-0">
                <div>
                  <button className="flex items-center text-sm gap-2 font-bold">
                    Trade <FaCaretDown className="text-xs text-gray-600" />
                  </button>
                </div>
                <div className="dropdown-content ">
                  <Link to="/login" className="text-sm ">
                    Log in
                  </Link>
                  <Link to="/register" className="text-sm ">
                    Create A New Account
                  </Link>
                </div>
              </div>

              {/* Client Dropdown */}
              <div className="dropdown">
                <button className="flex items-center text-sm gap-2 font-bold">
                  Client <FaCaretDown className="text-xs text-gray-600" />
                </button>
                <div className="dropdown-content ">
                  <Link to="/signin" className="text-sm">
                    Login
                  </Link>
                  <Link to="/signup" className="text-sm">
                    Register
                  </Link>
                </div>
              </div>

              {/* Language Dropdown with Flags */}
              <div className="dropdown flex gap-0">
                <button className="yellow flex items-center text-sm gap-2 font-bold">
                  {selectedLanguage}{" "}
                  <FaCaretDown className="text-xs text-gray-600" />
                </button>
                <div className="dropdown-content ">
                  <div
                    onClick={() => handleLanguageChange("🇬🇧 English")}
                    className="dropdown-item py-1 pl-4"
                  >
                    🇬🇧 English
                  </div>
                  <div
                    onClick={() => handleLanguageChange("🇪🇸 Spanish")}
                    className="dropdown-item py-1 pl-4"
                  >
                    🇪🇸 Spanish
                  </div>
                  <div
                    onClick={() => handleLanguageChange("🇫🇷 French")}
                    className="dropdown-item py-1 pl-4"
                  >
                    🇫🇷 French
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
      </header>

      <div
        className={`bg-sky-bg flex flex-col items-start gap-4 justify-end px-4 overflow-hidden transition-all duration-1000 ease-in-out ${
          toggleMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center w-full">
          <div className="buttons pt-2 mx-4  w-flex justify-center items-center gap-2">
            {/* Trade Mobile Dropdown */}
            <div className="dropdown">
              <div>
                <button className="bordered">Trade &#9660;</button>
              </div>
              <div className="dropdown-content">
                <Link to="/login" className="text-sm">
                  Log in
                </Link>
                <Link to="/register" className="text-sm">
                  Create A New Account
                </Link>
              </div>
            </div>

            {/* Client Mobile Dropdown */}
            <div className="dropdown">
              <button className="bordered">Client &#9660;</button>
              <div className="dropdown-content">
                <Link to="/signin" className="text-sm">
                  Login
                </Link>
                <Link to="/signup" className="text-sm">
                  Register
                </Link>
                <hr />
                <a href="#">
                  Night Mode <FaMoon />
                </a>
              </div>
            </div>

            {/* Language Mobile Dropdown */}
            <div className="dropdown">
              <button className="yellow">Language &#9660;</button>
              <div className="dropdown-content">
                <div
                  onClick={() => handleLanguageChange("🇬🇧 English")}
                  className="dropdown-item"
                >
                  🇬🇧 English
                </div>
                <div
                  onClick={() => handleLanguageChange("🇪🇸 Spanish")}
                  className="dropdown-item"
                >
                  🇪🇸 Spanish
                </div>
                <div
                  onClick={() => handleLanguageChange("🇫🇷 French")}
                  className="dropdown-item"
                >
                  🇫🇷 French
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;