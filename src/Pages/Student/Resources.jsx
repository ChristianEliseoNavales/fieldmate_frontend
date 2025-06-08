import React, { useState } from 'react';
import Header from '../PageComponents/header';
import Sidebar from '../PageComponents/sidebar';
import Footer from '../PageComponents/footer';
import { useNavigate } from 'react-router-dom';

function Resources() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const roadmapItems = [
    {
      title: 'Project Management',
      image: '/pictures/PM.jpg',
      description: 'Is the art of keeping tasks, teams, and goals on track for successful project completion.',
      path: '/PM',
    },
    {
      title: 'Code Development',
      image: '/pictures/CD.jpg',
      description: 'Turns ideas into functional software through coding and problem-solving.',
      path: '/CD',
    },
    {
      title: 'UI/UX Design',
      image: '/pictures/UIUX.jpg',
      description: 'Is the process of creating intuitive and visually appealing experiences for users.',
      path: '/UIUX',
    },
    {
      title: 'System Quality Assurance',
      image: '/pictures/SQA.jpg',
      description: 'Ensures that the developed application is reliable, secure, and performs as expected.',
      path: '/SQA',
    },
  ];

  return (
      <div className="flex flex-col">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
          } bg-[#F5F6FA] min-h-screen`}
        >
        <Header isExpanded={isSidebarExpanded} />

        <div className="p-8 mt-[100px]">
          <h1 className="text-[64px] font-bold text-center mb-4 text-[#1F3463] tracking-tight leading-tight">Internship Roadmap</h1>
          <p className="text-center text-[#4A5568] mb-10 text-[22px] px-40 leading-relaxed">
            Gain access to carefully selected resources that support skill development, boost productivity, and help you navigate your professional path with confidence.
          </p>

          <div className="grid grid-cols-2 gap-8 mx-auto items-center">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="group shadow-lg flex flex-col items-center justify-center h-[284px] text-center px-6 py-4 transition duration-300 border border-[#D9D9D9] hover:shadow-xl hover:scale-[1.015] cursor-pointer rounded-2xl bg-white"
              >
                <div className="bg-white rounded-xl w-full h-full flex flex-col overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center rounded-xl relative transition duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm p-4 flex items-center justify-center text-center">
                      <div className="transition-all duration-300 ease-in-out mt-15 group-hover:translate-y-[-20px] flex flex-col items-center justify-center min-h-[120px]">
                        <h2 className="text-[36px] font-extrabold text-[#1F3463] drop-shadow-[0_2px_2px_rgba(255,255,255,1)] transition-all duration-300 leading-tight">
                          {item.title}
                        </h2>
                        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 text-[#1F3463] font-medium text-[20px] leading-snug max-w-[90%] mx-auto">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resources;
