import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaRegCopy, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function SQA() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const arrowBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    localStorage.setItem("recentRole", "/SQA");
  }, []);

  const topics = [
    {
      title: "Understand the quality assurance context.",
      link: "https://youtu.be/4neq2L6yDRI?si=7gP0m32J6xqWaIzf"
    },
    {
      title: "Understand SQA projects.",
      link: "https://youtube.com/playlist?list=PLsjUcU8CQXGGguAbeip-Q_ZckElVGUwxQ&si=hRpZPGHYVv3hnpIj"
    },
    {
      title: "Understand SQA management organization.",
      link: "https://youtu.be/ixJGuPx7EO8?si=4pjwFXyDcg1EtmD6"
    },
    {
      title: "Understand TEST CASES In Manual Testing.",
      link: "https://youtu.be/g0PrXoWKM2Y?si=5v-mq4dR51o3AQef"
    },
    {
      title: "The Software Quality Challenge.",
      link: "https://youtu.be/AF1_k8ikykk?si=asKIug8OnDG7GlmP"
    },
    {
      title: "Software Quality Factors.",
      link: "https://youtu.be/7Z1kRTRDUKg?si=J_3iD5cihyvjGVsk"
    },
    {
      title: "Components of SQA System.",
      link: "https://youtu.be/A315SGjrA14?si=5vjAQZkTcMWVU1Ml"
    }
  ];

  return (
    <div className="flex flex-col">
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
          <h1 className="text-[70px] font-bold text-[#1C1C4D] mb-2 text-center">
            System Quality Assurance
          </h1>
          <p className="text-gray-600 mb-10 text-[25px] text-center">
            Navigate your internship journey with essential resources to strengthen your system quality assurance skills
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

export default SQA;
