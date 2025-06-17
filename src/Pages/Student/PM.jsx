import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaRegCopy, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function PM() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const arrowBack = () => {
    navigate(-1);
  };

  const topics = [
    {
      title: "What is Project Management.",
      link: "https://youtu.be/bw-NvGvLHtM?si=Lo75rl8a78cZ_w_g"
    },
    {
      title: "How to be a Project Manager ?",
      link: "https://youtu.be/J2RQTf0ecsA?si=U_ZRCcCiuOtod5MF"
    },
    {
      title: "Introduction to project management.",
      link: "https://youtu.be/rBSCvPYGnTc?si=D245aG3pZV2LK0pA"
    },
    {
      title: "Agile and waterfall methodology.",
      link: "https://youtu.be/mepINtMD1aE?si=DYNyapdgTi1AVl7Q"
    },
    {
      title: "Project Management Foundations, Initiation, and Planning.",
      link: "https://youtu.be/hIhTtzo0eBg?si=Ziagjf6Hv-HZE34P"
    },
    {
      title: "Introduction to Scrum Master Training.",
      link: "https://youtube.com/playlist?list=PLEiEAq2VkUUJKZEL96YBV78Dd5gsHSVZ7&si=N4y14EqVNZqfGAsZ"
    },
    {
      title: "Agile Leadership: Introduction to Change.",
      link: "https://youtu.be/ReG5nkfc89A?si=bDBcllq1VNuy8knm"
    }
  ];

  useEffect(() => {
    localStorage.setItem("recentRole", "/PM");
  }, []);

  return (
    <div className="flex flex-col ">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#F5F7FB] min-h-screen`}
      >
        <Header isExpanded={isSidebarExpanded}/>
        <div className="mt-[110px] ml-10 bg-[#F5F7FB]">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={arrowBack} />
        </div>
        <div className="py-10 px-20">
          <h1 className="text-[70px] font-bold text-[#1C1C4D] mb-2 text-center">Project Management</h1>
          <p className="text-gray-600 mb-10 text-[25px] text-center">
            Navigate your internship journey with essential resources to strengthen your project management skills
          </p>
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#FAFAFF] p-4 rounded-md shadow-sm hover:bg-[#BEFAF5] transition"
              >
                <span className="text-[#1F3463] text-[30px] py-3 px-5">{topic.title}</span>
                <a
                  href={topic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt size={25} className=" text-gray-400 hover:text-black cursor-pointer mx-10" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PM;
