import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { FaRegCopy, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function UIUX() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const arrowBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    localStorage.setItem("recentRole", "/UIUX");
  }, []);

  const topics = [
    {
      title: "UI Designer.",
      link: "https://youtu.be/8rTTP7DE3rs?si=9zw51vx4s8w34ege"
    },
    {
      title: "UX Designer.",
      link: "https://youtu.be/SRec90j6lTY?si=ABAhe-KEArb6GAdr"
    },
    {
      title: "Accessibility and Inclusive Design.",
      link: "https://youtu.be/s00A3SjZarc?si=8YkR6phbj22Exq6f"
    },
    {
      title: "Mobile and Web Applications.",
      link: "https://youtu.be/lMadZH4AgT4?si=L2wRsWQ7_fLp5_nD"
    },
    {
      title: "Responsive Design.",
      link: "https://youtu.be/lMadZH4AgT4?si=L2wRsWQ7_fLp5_nD"
    },
    {
      title: "Industry Trends and Case Studies.",
      link: "https://youtu.be/XX2gZTGwZWc?si=b199Yt6FKuV4KsBJ"
    },
    {
      title: "UI/UX Tools.",
      link: "https://youtu.be/dcPp_U-v3bI?si=E7B-c0n6FnACBJGZ"
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
          <h1 className="text-[70px] font-bold text-[#1C1C4D] mb-2 text-center">UI/UX Design</h1>
          <p className="text-gray-600 mb-10 text-[25px] text-center">
            Navigate your internship journey with essential resources to strengthen your UI/UX design skills
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

export default UIUX;
