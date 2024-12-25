import React, { useState } from "react";
import DotAnimation from "./DotAnimation";
import "./Footer.css";
import {
  FaArrowRightLong,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { RiMessage2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AiFillTiktok } from "react-icons/ai";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to the server
    fetch("http://localhost:3003/addEmailToMailList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset the email input after submission
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <footer className="flex bg-dark md:flex-row px-2 flex-col">
        <div className="flex flex-col items-center justify-center bg-sky-bg p-4 md:mb-[-100px] md:w-1/3 md:ml-24">
          <img
            src="https://i.postimg.cc/13JvwsDs/Myapproved-logo.png"
            alt="logo"
          />
          <p className="text-sm text-center my-6 text-dark leading-3">
            Join our community of tradespeople and clients today and stay
            informed with our newsletter. Our weekly newsletter is packed with
            valuable insights, tips, and updates on the tradespeople industry.
            From interviews with top tradespeople to insider information on the
            latest industry developments, our newsletter has it all.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex items-start justify-center">
              <input
                className=" py-3 h-full"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                type="submit"
                className="bg-dark text-white py-3 text-nowrap"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="w-full">
          <div className="ml-20">
            <div>
              <h2 className="text-3xl font-bold ms-4">Get In Touch</h2>
              <div className="w-28 my-3">
                <DotAnimation value={1} />
              </div>
              <p className="flex gap-2 items-center text-sm my-2">
                <RiMessage2Line className="text-yellow" />{" "}
                customercare@myapproved.com
              </p>
              <p className="flex gap-2 items-center text-sm my-2">
                <FiPhone className="text-yellow" /> +0747 123 4567
              </p>

              <div className="flex gap-2 mt-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100091820559394"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="p-2 bg-black">
                    <FaFacebookF className="text-white text-lg" />
                  </p>
                </a>
                <a
                  href="https://www.linkedin.com/in/my-approved-67784826b/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="p-2 bg-black">
                    <FaLinkedinIn className="text-white text-lg" />
                  </p>
                </a>
                <a
                  href="https://www.instagram.com/my_approved/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="p-2 bg-black">
                    <FaInstagram className="text-white text-lg" />
                  </p>
                </a>
                <a
                  href="https://twitter.com/myapproved"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="p-2 bg-black">
                    <FaTwitter className="text-white text-lg" />
                  </p>
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <h2 className="text-3xl font-bold ms-4">Quick Links</h2>
              <div className="w-28 my-3">
                <DotAnimation value={1} />
              </div>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/About"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Terms"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Privacy"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> Privacy
                  </Link>
                </li>
                <li style={{ display: "none" }}>
                  <Link
                    to="/Directory"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> Directory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ContactUs"
                    className="text-white flex items-center gap-2 text-sm"
                  >
                    <FaArrowRightLong className="text-yellow" /> Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-dark-blue text-white flex flex-col items-center justify-center  h-[100px] text-center md:px-20 px-4">
        <p className="text-sm max-w-[600px] w-full text-end">
          &copy;{" "}
          <a href="#" className="text-white underline">
            MyApproved
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
