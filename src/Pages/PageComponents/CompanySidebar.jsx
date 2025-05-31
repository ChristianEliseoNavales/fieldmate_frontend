import React from "react";
import { FaUserCheck, FaChevronLeft } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { PiSidebarFill } from "react-icons/pi";
import { useLocation, Link } from "react-router-dom";

const CompanySidebar = ({ isExpanded, setIsExpanded }) => {
  const location = useLocation();

  const navItems = [
    { label: "Company Dashboard", icon: <TiHome size={35} />, path: "/CompanyDashboard" },
    { label: "Attendance Tracking", icon: <FaUserCheck size={35} />, path: "/CompanyAttendance" },
    { label: "Journal Submission", icon: <HiMiniPencilSquare size={35} />, path: "/CompanyJournal", activePaths: ["/CompanyJournal", "/CompanyViewJournal/:id"] },
  ];

  const toggleSidebar = () => {
    if (typeof setIsExpanded === "function") {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      className="h-screen bg-[#1F3463] text-white fixed flex flex-col justify-between transition-width duration-500 ease-in-out z-50 overflow-hidden"
      style={{
        width: isExpanded ? 400 : 110,
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col pt-5">
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5"
          style={{ height: 80, minWidth: 80 }}
        >
          <img src="/pictures/logo.png" alt="La Verdad Logo" className="h-[60px] ml-1" />
          <div
            className="overflow-hidden whitespace-nowrap"
            style={{
              maxWidth: isExpanded ? 300 : 0,
              opacity: isExpanded ? 1 : 0,
              transition: "max-width 0.5s ease, opacity 0.5s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <p className="text-[30px] font-custom leading-none">LA VERDAD</p>
            <span className="text-[22px] font-custom">CHRISTIAN COLLEGE, INC.</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="w-full pt-4 whitespace-nowrap">
          <p className="border-t-3 p-2"></p>
          <ul className="space-y-2 ml-3">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center rounded-l-[50px] px-4 py-3 ml-2 transition-colors duration-300 ease-in-out ${
                      isActive
                        ? "bg-white text-[#1F3463]"
                        : "hover:bg-[#F9FAFD] hover:text-[#1F3463]"
                    }`}
                    style={{ gap: 16 }}
                  >
                    <div
                      style={{
                        width: 40,
                        display: "flex",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      className="overflow-hidden whitespace-nowrap"
                      style={{
                        maxWidth: isExpanded ? 260 : 0,
                        opacity: isExpanded ? 1 : 0,
                        transition: "max-width 0.5s ease, opacity 0.5s ease",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      <span className="text-[24px]">{item.label}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Toggle Button */}
      <div className="pb-3 w-full px-4 py-3 flex flex-col gap-4">
        <button
          onClick={toggleSidebar}
          className="bg-[#1F3463] mb-2"
          aria-label="Toggle Sidebar"
          type="button"
        >
          {isExpanded ? (
            <FaChevronLeft size={35} className="cursor-pointer ml-2" />
          ) : (
            <PiSidebarFill size={35} className="cursor-pointer ml-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanySidebar;
