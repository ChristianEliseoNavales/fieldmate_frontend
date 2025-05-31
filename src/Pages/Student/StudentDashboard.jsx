import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../PageComponents/sidebar";
import Header from "../PageComponents/header";
import Footer from "../PageComponents/footer";
import { LuUser } from "react-icons/lu";
import Calendar from "../PageComponents/Calendar";
import Skeleton from "../../components/Skeleton";
import useAttendanceSummaryStats from "../../components/AttendanceSummaryStats";
import RecentlyAccessedRole from "../../components/RecentlyAccessedRole";
import userInfo from "../../services/userInfo";

function StudentDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { firstName, lastName, company, loading } = userInfo(BASE_URL);
  const summary = useAttendanceSummaryStats(firstName, lastName);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const navigate = useNavigate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6FA]">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        }`}
      >
        <Header isExpanded={isSidebarExpanded} firstName={firstName} />

        <div className="px-8 grid grid-cols-3 gap-6 mt-[100px] mb-10">
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between border border-[#D1D5DB]">
              <div className="flex items-center gap-5 h-[118px]">
                <div className="flex items-center justify-center text-[#1E3A8A]">
                  <LuUser size={65} />
                </div>
                <div>
                  <div className="text-[30px] font-semibold text-[#111827]">
                    {loading ? <Skeleton width="200px" height="36px" /> : `Hello, ${firstName || "Intern"}!`}
                  </div>
                  <div className="text-[18px] mt-1 text-[#4B5563]">
                    {loading ? <Skeleton width="150px" height="24px" /> : `${company || "Intern"} Intern`}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-[#D1D5DB]">
              <h2 className="text-[22px] font-semibold text-[#1F2937] mb-4">Attendance Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Present */}
                <div className="bg-[#EDEEF3] p-5 rounded-lg border-l-[6px] border-[#22C55E] shadow-sm">
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <div className="text-[36px] font-bold text-[#22C55E]">
                        {loading ? <Skeleton width="60px" height="45px" /> : summary.presentDays}
                      </div>
                      <p className="text-[18px] text-[#22C55E]">Days</p>
                    </div>
                    <img src="/pictures/Green.png" alt="Present Icon" className="w-[80px]" />
                  </div>
                  <p className="text-[20px] font-medium text-[#22C55E] mt-4">Total Present Days</p>
                </div>

                {/* Late */}
                <div className="bg-[#EDEEF3] p-5 rounded-lg border-l-[6px] border-[#F97316] shadow-sm">
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <div className="text-[36px] font-bold text-[#F97316]">
                        {loading ? <Skeleton width="60px" height="45px" /> : summary.lateHours}
                      </div>
                      <p className="text-[18px] text-[#F97316]">Hours</p>
                    </div>
                    <img src="/pictures/Orange.png" alt="Late Icon" className="w-[80px]" />
                  </div>
                  <p className="text-[20px] font-medium text-[#F97316] mt-4">Total Late Time</p>
                </div>

                {/* Absent */}
                <div className="bg-[#EDEEF3] p-5 rounded-lg border-l-[6px] border-[#DB2777] shadow-sm">
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <div className="text-[36px] font-bold text-[#DB2777]">
                        {loading ? <Skeleton width="60px" height="45px" /> : summary.absentDays}
                      </div>
                      <p className="text-[18px] text-[#DB2777]">Days</p>
                    </div>
                    <img src="/pictures/Pink.png" alt="Absent Icon" className="w-[80px]" />
                  </div>
                  <p className="text-[20px] font-medium text-[#DB2777] mt-4">Total Absent Days</p>
                </div>
              </div>
            </div>

            {/* Time Remaining & Recently Accessed */}
            <div className="grid grid-cols-2 gap-6">
              {/* Time Remaining */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-[#D1D5DB]">
                <h1 className="text-[22px] text-center font-semibold mb-5 text-[#1F2937]">Time Remaining</h1>
                <div className="flex justify-around">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <div className="h-34 w-34 mb-2 animate-pulse rounded-full bg-gray-200" />
                    ) : (
                      <svg className="h-34 w-34 mb-2" viewBox="0 0 36 36">
                        <path fill="none" stroke="#E5E7EB" strokeWidth="4"
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path fill="none" stroke="#1F3463" strokeWidth="4"
                          strokeDasharray="100, 100"
                          strokeDashoffset={100 - (summary.remainingDays / 56) * 100}
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20" textAnchor="middle" fill="#1F3463" fontSize="6" fontWeight="bold">
                          {summary.remainingDays}/56
                        </text>
                      </svg>
                    )}
                    <span className="text-[18px] text-[#374151]">Days</span>
                  </div>

                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <div className="h-34 w-34 mb-2 animate-pulse rounded-full bg-gray-200" />
                    ) : (
                      <svg className="h-34 w-34 mb-2" viewBox="0 0 36 36">
                        <path fill="none" stroke="#E5E7EB" strokeWidth="4"
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path fill="none" stroke="#1F3463" strokeWidth="4"
                          strokeDasharray="100, 100"
                          strokeDashoffset={100 - (summary.totalHours / 500) * 100}
                          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20" textAnchor="middle" fill="#1F3463" fontSize="6" fontWeight="bold">
                          {summary.totalHours}/500
                        </text>
                      </svg>
                    )}
                    <span className="text-[18px] text-[#374151]">Hours</span>
                  </div>
                </div>
              </div>

              {/* Recently Accessed Role */}
              <RecentlyAccessedRole loading={loading} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Journal Submission */}
            <div className="bg-white p-6 rounded-xl shadow-md text-center border border-[#D1D5DB]">
              <h1 className="text-[22px] font-semibold mb-5 text-[#1F2937]">Journal Submission</h1>
              <div
                onClick={() => navigate("/ViewJournal")}
                className="relative flex justify-center items-center border border-[#D1D5DB] rounded-lg text-gray-700 bg-[#F3F4F6] h-[160px] p-5 text-[18px] cursor-pointer hover:bg-[#E5E7EB] transition duration-300"
              >
                {loading ? (
                  <Skeleton width="200px" height="28px" />
                ) : (
                  `${firstName} ${lastName} – ${new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}`
                )}
              </div>
            </div>

            {/* Calendar */}
            {/* <div className="bg-white p-6 rounded-xl shadow-md border border-[#D1D5DB]"> */}
              <Calendar year={currentYear} month={currentMonth} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentDashboard;
