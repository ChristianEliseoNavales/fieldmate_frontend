import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import Skeleton from "./Skeleton";
import useCompanyHeader from "../services/use/useCompanyHeader";

function CompanyHeader({ isExpanded }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { firstName, lastName, email, loading } = useCompanyHeader();

  const pageTitles = {
    '/CompanyDashboard': 'Company Dashboard',
    '/CompanyAttendance': 'Attendance Tracking',
    '/CompanyJournal': 'Journal Submission',
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  const getInitials = (firstName, lastName) => {
    const getFirstInitial = (str) => {
      const firstWord = str?.trim().split(" ")[0] || "";
      return firstWord.charAt(0).toUpperCase();
    };

    return `${getFirstInitial(firstName)}${getFirstInitial(lastName)}`;
  };


  return (
    <header
      className={`fixed top-0 z-40 flex justify-between items-center h-[100px] px-10 bg-[#F9FAFD] transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        left: isExpanded ? 400 : 100,
        width: `calc(100% - ${isExpanded ? 400 : 100}px)`,
      }}
    >
      <h1 className="text-[28px] font-semibold">{title}</h1>

      <div className="flex items-center">
        <UserProfileModal
          name={
            loading ? (
              <Skeleton width="100px" height="20px" />
            ) : (
              `${firstName} ${lastName}`
            )
          }
          initials={
            loading ? (
              <Skeleton width="24px" height="24px" />
            ) : (
              getInitials(firstName, lastName)
            )
          }
        />
      </div>
    </header>
  );
}

export default CompanyHeader;
