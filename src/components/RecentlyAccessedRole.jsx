import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Skeleton from "./Skeleton";

const roleMap = {
  "/PM": {
    title: "Project Management",
    image: "/pictures/PM.jpg",
  },
  "/CD": {
    title: "Code Development",
    image: "/pictures/CD.jpg",
  },
  "/UIUX": {
    title: "UI/UX Design",
    image: "/pictures/UIUX.jpg",
  },
  "/SQA": {
    title: "System Quality Assurance",
    image: "/pictures/SQA.jpg",
  },
};

function RecentlyAccessedRole({ loading }) {
  const [recentPath, setRecentPath] = useState("/PM");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Get user email from Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load user-specific recent path
  useEffect(() => {
    if (userEmail) {
      const key = `recentRole_${userEmail}`;
      const stored = localStorage.getItem(key);
      if (stored && roleMap[stored]) {
        setRecentPath(stored);
      }
    }
  }, [userEmail]);

  const { title, image } = roleMap[recentPath] || roleMap["/PM"];

  const handleClick = () => {
    navigate(recentPath);
  };

  return (
    <div
      className="relative bg-white rounded-xl shadow-md border border-[#D1D5DB] p-6 rounded-[10px] shadow h-[305px] cursor-pointer group flex flex-col justify-between overflow-hidden"
    >
      <h2 className="text-[22px] text-center font-semibold text-[#3F3F46] px-2 mb-5 z-10">
        Recently Accessed Role
      </h2>

      <div
        className="relative flex-1 w-full rounded-[10px] overflow-hidden flex items-center justify-center shadow-md border border-[#D1D5DB] cursor-pointer"
        onClick={handleClick}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-in-out z-0"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Dim Layer */}
        <div className="rounded-[10px] absolute inset-0 bg-black/5 z-10 transition-opacity duration-500 ease-in-out" />

        {/* Hover Overlay */}
        <div className="absolute border-1 border-[#005CFA] rounded-[10px] inset-0 z-20 opacity-0 group-hover:opacity-100 bg-white/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ease-in-out">
          <span className="text-[24px] text-black/70">View Recent</span>
        </div>

        {/* Title Text */}
        <div className="relative z-30 text-center px-4 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
          <span
            className="absolute inset-0 text-[30px] font-black text-[#1F3463] pointer-events-none select-none"
            style={{
              WebkitTextStroke: "12px white",
              WebkitTextFillColor: "transparent",
            }}
          >
            {loading ? <Skeleton width="220px" height="40px" /> : title}
          </span>

          <span className="relative text-[30px] font-black text-[#1F3463]">
            {loading ? <Skeleton width="220px" height="40px" /> : title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecentlyAccessedRole;
