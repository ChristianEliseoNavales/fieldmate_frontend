import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import Slider from "./PageComponents/slider";

function Homepage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState("lvcc");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const home = document.getElementById("home");
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");

      if (contact && scrollY >= contact.offsetTop - 100) {
        setActiveSection("contact");
      } else if (about && scrollY >= about.offsetTop - 100) {
        setActiveSection("about");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const events = [
    {
      date: "FEBRUARY 10",
      title: "BSIS & ACT Program Orientation",
    },
    {
      date: "FEBRUARY 24–28",
      title: "La Verdad Christian College 26th Foundation Week",
    },
    {
      date: "APRIL 7–14",
      title: "Higher Education Midterm Exams",
    },
    {
      date: "APRIL 21–25",
      title: "8th ICT Week Celebration",
    },
    {
      date: "APRIL 28",
      title: "Higher Education - Recognition day",
    },
  ];

  const contentMap = {
    lvcc: {
      title: "LA VERDAD CHRISTIAN COLLEGE",
      image: "pictures/LVGate.jpg",
      logo: "pictures/logo.png",
      description: `La Verdad Christian College, Inc. (LVCC) is a non-sectarian and non-profit institution that is committed to provide quality education at pace with changing times while imparting wisdom based on biblical truth to communities.
`,
    },
    bsis: {
      title: "BS IN INFORMATION SYSTEM",
      image: "pictures/BSISimg.png",
      logo: "pictures/BSIS.png",
      description: `The Information Systems program provides students with foundation knowledge on organizations and Information and Communications Technology (ICT). It allows students to understand how ICT can enable organizations to improve performance and achieve competitive advantage. It trains students to develop strong analytical, technical, and leadership skills to thrive in a global environment as future information systems professionals. `,
    },
    aim: {
      title: "ASSOCIATION OF ICT MAJORS",
      image: "pictures/AIMimg.png",
      logo: "pictures/AIM.png",
      description: `Empowering the next generation of tech leaders. Association of ICT Majors (AIM) is community for BS Information Systems and Computer Technology students to collaborate, innovate, and grow together.`,
    },
  };

  const signUp = () => {
    navigate("/SignUp");
  };

  const signIn = () => {
    navigate("/SignIn");
  };

  const Explore = () => {
    navigate("/Explore");
  };

  return (
      <div
        className={`relative w-full min-h-screen bg-white transition-opacity duration-1000 ease-in ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
      <header
        className={`w-full top-0 z-50 p-5 fixed transition-colors duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="flex justify-between items-center py-4 px-10">
          <div className="flex items-center space-x-3">
            <img
              src="pictures/logo.png"
              alt="La Verdad Christian College Logo"
              className="h-20"
            />
            <span className="ml-2 text-[30px] font-custom">
              LA VERDAD <br />
              <span className="text-[30px]">CHRISTIAN COLLEGE, INC.</span>
            </span>
          </div>

          <div className="flex space-x-20 text-[23px]">
            <a href="#home" className="relative text-blue-900 font-bold">
              Home
              {activeSection === "home" && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>
              )}
            </a>
            <a href="#about" className="relative text-blue-900 font-bold">
              About Us
              {activeSection === "about" && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>
              )}
            </a>
            <a href="#contact" className="relative text-blue-900 font-bold">
              Contact Us
              {activeSection === "contact" && (
                <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400"></span>
              )}
            </a>
          </div>

          <div className="flex space-x-3 text-[22.5px] font-bold">
            <button
              className="px-7 py-2 bg-white/10 text-[#1F3463] border-2 border-[#1F3463] rounded-[10px] cursor-pointer"
              onClick={signUp}
            >
              Sign Up
            </button>
            <button
              className="px-9 py-2 bg-[#1E3A8A] text-white rounded-[10px] cursor-pointer hover:bg-[#1F3463] transition"
              onClick={signIn}
            >
              Log In
            </button>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <div id="home" className="relative h-[1000px]">
        <div className="absolute inset-0 z-0">
          <Slider />
        </div>

        <div className="relative z-10 flex items-center justify-start h-full px-20">
          <div className="max-w-2xl text-left ml-10">
            <h1 className="text-[110px] font-bold text-black">FieldMate</h1>
            <p className="mt-4 text-[28px] text-gray-800">
              La Verdad Christian College Bachelor of Science in Information
              System Field Practicum Attendance Tracking System.
            </p>
            <button
              className="mt-6 px-15 py-3 bg-[#1E3A8A] text-white font-semibold text-[24px] rounded-lg cursor-pointer hover:bg-[#1F3463] transition"
              onClick={Explore}
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="flex justify-around py-6 pt-15 bg-transparent cursor-pointer"
      >
        <div className="text-center" onClick={() => setSelected("lvcc")}>
          <img
            src="pictures/logo.png"
            alt="LVCC"
            className={`h-27 mx-auto transition duration-300 ${
              selected !== "lvcc" ? "grayscale" : ""
            }`}
          />
          <p
            className={`text-[23px] ${
              selected !== "lvcc" ? "text-gray-500" : "text-black"
            }`}
          >
            LVCC
          </p>
        </div>

        <div className="text-center" onClick={() => setSelected("bsis")}>
          <img
            src="pictures/BSIS.png"
            alt="BSIS"
            className={`h-27 mx-auto transition duration-300 ${
              selected !== "bsis" ? "grayscale" : ""
            }`}
          />
          <p
            className={`text-[23px] ${
              selected !== "bsis" ? "text-gray-500" : "text-black"
            }`}
          >
            BSIS
          </p>
        </div>

        <div className="text-center" onClick={() => setSelected("aim")}>
          <img
            src="pictures/AIM.png"
            alt="AIM"
            className={`h-27 mx-auto transition duration-300 ${
              selected !== "aim" ? "grayscale" : ""
            }`}
          />
          <p
            className={`text-[23px] ${
              selected !== "aim" ? "text-gray-500" : "text-black"
            }`}
          >
            AIM
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center py-12 bg-white">
        <div className="flex content-center gap-15">
          <div className="w-1/2">
            <img
              src={contentMap[selected].image}
              alt={contentMap[selected].title}
              className="rounded-lg shadow-lg  w-[650px] h-[588px]"
            />
          </div>
          <div className="max-w-[850px] pl-8">
            <div className="flex items-center mb-15 ">
              <img
                src={contentMap[selected].logo}
                alt={contentMap[selected].title}
                className="h-[126px] mr-4"
              />
              <h2 className="text-[35px] font-bold text-[#2D0F7F]">
                {contentMap[selected].title}
              </h2>
            </div>
            <p className="text-[26px] text-gray-800 leading-relaxed text-justify">
              {contentMap[selected].description}
            </p>
          </div>
        </div>
      </div>

      {/*  Skew Section */}
      <div className="mt-[-50px] relative w-full h-110 overflow-hidden">
        <div className="absolute inset-0 bg-[#1E3A8A] transform skew-y-[10deg] origin-top-left"></div>
      </div>

      {/* Contact Section */}
      <div
        id="contact"
        className="flex w-full place-content-center bg-[#1E3A8A] "
      >
        <div className="flex flex-col place-content-center px-8 py-5 gap-8 mb-20 -mb-10">
          <div className=" flex flex-col ml-10">
            <h2 className="text-[40px] text-white font-bold ">
              Get in Touch with Us
            </h2>
            <h6 className="text-[25px] text-[#D9D9D9] max-w-[740px]">
              Have questions or need assistance? We’re here to help! Reach out
              to us through any of the following channels:
            </h6>
          </div>
          <div className="flex justify-center bg-[#1E3A8A]">
            <div className="bg-white shadow-md rounded-l-lg p-6 w-1/2 w-[511px] py-20">
              <div className="flex gap-6 ">
                <FaPhone size={39} className="" />
                <div className="flex-col">
                  <h3 className="text-[30px] font-bold text-[#1F3463] ">
                    {" "}
                    Phone
                  </h3>
                  <p className="text-[27px]">(045) 436 1040</p>
                </div>
              </div>

              <div className="flex gap-6 mt-5">
                <BsEnvelopeFill size={39} />
                <div className="flex-col">
                  <h3 className="text-[30px] font-bold text-[#1F3463]">
                    Email
                  </h3>
                  <p className="text-[27px]">info@laverdad.edu.ph</p>
                  <p className="text-[27px]">registrar@laverdad.edu.ph</p>
                </div>
              </div>

              <div className="flex gap-6 mt-5">
                <FaLocationDot size={39} />
                <div className="flex-col">
                  <h3 className="text-[30px] font-bold text-[#1F3463]">
                    {" "}
                    Address
                  </h3>
                  <p className="text-[27px] w-[400px]">
                    La Verdad Christian College, McArthur Highway, Sampaloc,
                    Apalit, Pampanga
                  </p>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <iframe
                className="rounded-r-lg shadow-md h-full w-[511px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3854.606472345355!2d120.75580687511305!3d14.959002285570884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33965634a341dc6f%3A0x17091aa8b0043f89!2sLa%20Verdad%20Christian%20College!5e0!3m2!1sen!2sph!4v1743415006176!5m2!1sen!2sph"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="w-[719px] max-h-[793px]">
          <div className="bg-white shadow-md rounded-lg p-10">
            <h3 className="text-[50px] font-bold text-center text-[#1F3463]">
              Calendar of Events
            </h3>
            <p className="border-b border-2 text-[#959494] mx-5"></p>
            <div className="mt-4 space-y-4">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="flex items-center bg-[#F1F1F1] justify-between py-[17px] px-4 border-1 border-[#494949] rounded-md w-[630px]"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <CiCalendar size={66} />
                    </div>
                    <div>
                      <h4 className="text-[26px] font-bold text-[#1F3463]">
                        {event.date}
                      </h4>
                      <p className="text-[20px]">{event.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#1F3463] text-white w-full py-5 ">
        <div className=" mx-auto  ">
          <div className="flex justify-between gap-8 md:px-30 pt-8 ">
            {/* Left Section - Project Info */}
            <div>
              <h3 className="text-[40px] font-bold">FieldMate</h3>
              <p className="text-[18px] mt-2 max-w-[478px] leading-relaxed">
                La Verdad Christian College Bachelor of Science in Information
                System Field Practicum Attendance Tracking System.
              </p>
            </div>

            {/* Middle Section - About Us & Social Media */}
            <div className="">
              <h4 className="font-bold text-[20px]">About Us</h4>
              <p className="text-[20px] mt-1">La Verdad Christian College</p>
              <p className="text-[20px]">
                Bachelor of Science in Information Systems
              </p>
              <p className="text-[20px]">Association of ICT Majors</p>

              {/* Social Icons */}
              <h4 className="font-bold text-[20px]">Contact Us</h4>
              <div className="flex justify-start space-x-4 mt-4">
                <a href="https://www.facebook.com/lvcc.apalit" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <FaFacebookF size={38} />
                </a>
                <a href="https://www.instagram.com/explore/locations/307272513/la-verdad-christian-college/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <FaInstagram size={38} />
                </a>
                <a href="https://x.com/laverdadapalit" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <FaTwitter size={38} />
                </a>
              </div>
            </div>

            {/* Right Section - School Logo & Motto */}
            <div className="flex justify-start flex-col">
              <div className="flex gap-4 ">
                <img
                  src="pictures/logo.png"
                  alt="La Verdad Logo"
                  className="h-[70px] my-auto"
                />
                <div className="flex flex-col">
                  <p className="text-[30px] font-custom max-w-[300px] ">
                    LA VERDAD
                  </p>
                  <span className="text-[20px] font-custom">
                    CHRISTIAN COLLEGE. INC.
                  </span>
                </div>
              </div>
              <span className="mt-4 font-bold text-[23px] text-center">
                “Wisdom based on the Truth is <br></br>Priceless”
              </span>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-6 border-t border-gray-400 pt-4 text-center text-[23px] w-full">
            © 2025 FieldMate. All rights reserved. |{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;