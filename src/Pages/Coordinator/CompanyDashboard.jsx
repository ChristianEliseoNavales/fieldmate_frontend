import React, { useState, useEffect } from "react";
import CompanySidebar from "../../components/CompanySidebar";
import CompanyHeader from "../../components/CompanyHeader";
import Footer from "../../components/footer";
import Calendar from "../../components/Calendar";
import { LuUser } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import StandardPagination from "../../components/StandardPagination";
import CompanyDashboardStats from "../../components/CompanyDashboardStats";
import Skeleton from "../../components/Skeleton";
import userInfo from "../../services/userInfo";
import useCompanyDashboard from "../../services/coordinator/useCompanyDashboard";

function CompanyDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [present, setPresent] = useState(null);
  const [late, setLate] = useState(null);
  const [absent, setAbsent] = useState(null);
  const [pendingAttendance, setPendingAttendance] = useState(null);
  const [unreadJournals, setUnreadJournals] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { firstName, lastName, company, loading } = userInfo(BASE_URL);
  const {
    interns,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedInterns,
    internsPerPage,
    handleCardNavigation,
    resetPagination
  } = useCompanyDashboard(company);

  // Reset to page 1 when modal opens
  useEffect(() => {
    if (showModal) {
      resetPagination();
    }
  }, [showModal, resetPagination]);

  const absentInterns =
    present !== null && interns.length !== null
      ? Math.max(0, interns.length - present)
      : null;

return (
    <div className="flex flex-col min-h-screen">
      {/* ------------- Sidebar ------------- */}
      <CompanySidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />

      {/* ------------- Main panel ------------- */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-[400px]" : "ml-[106px]"
        } bg-[#F5F7FB]`}
      >
        {/* Header */}
        <CompanyHeader isExpanded={isSidebarExpanded} firstName={firstName} />

        {/* Dashboard Stats – reserve height so the layout never shifts */}
        <div className="min-h-[70px]">
          <CompanyDashboardStats
            onDataReady={({
              presentInterns,
              lateInterns,
              pendingAttendance,
              unreadJournals,
            }) => {
              setPresent(presentInterns);
              setLate(lateInterns);
              setPendingAttendance(pendingAttendance);
              setUnreadJournals(unreadJournals);
            }}
          />
        </div>

        {/* Main grid */}
        <div
          className={`px-8 grid grid-cols-3 gap-6 ${
            loading || <Skeleton/> ? "mt-[40px]" : "mt-[100px]"
          } mb-10 transition-all`}
        >
          {/* ---------------- LEFT COLUMN (2/3) ---------------- */}
          <div className="col-span-2 space-y-6">
            {/* Greeting card */}
            <div className="bg-white p-5 rounded-[10px] shadow-md flex items-center justify-between border border-[#D9D9D9] transition-shadow">
              <div className="flex items-center gap-4 h-[118px]">
                <LuUser size={65} className="text-[#1F3463]" />
                <div>
                  {/* name (fixed height) */}
                  <div className="text-[30px] font-semibold h-[40px] flex items-center">
                    {loading ? (
                      <Skeleton width="200px" height="36px" />
                    ) : (
                      `Hello, ${firstName || "Intern"}!`
                    )}
                  </div>
                  {/* company (fixed height) */}
                  <div className="text-[18px] text-gray-600 mt-1 h-[28px] flex items-center">
                    {loading ? (
                      <Skeleton width="150px" height="24px" />
                    ) : (
                      `${company || "Coordinator"} Coordinator`
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-white p-6 rounded-[10px] shadow-md border border-[#D9D9D9] h-[287px]">
              <div className="text-[25px] font-semibold text-[#1F3463] mb-4">
                Daily Attendance Summary
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Present */}
                <div className="bg-[#EDEEF3] rounded-lg border-l-[6px] border-[#22C55E] shadow-sm">
                  <SummaryCard
                    label="Present"
                    interns={present}
                    color="green"
                    icon="/pictures/Green.png"
                  />
                </div>
                {/* Late */}
                <div className="bg-[#EDEEF3] rounded-lg border-l-[6px] border-[#F97316] shadow-sm">
                  <SummaryCard
                    label="Late"
                    interns={late}
                    color="yellow"
                    icon="/pictures/Orange.png"
                  />
                </div>
                {/* Absent */}
                <div className="bg-[#EDEEF3] rounded-lg border-l-[6px] border-[#DB2777] shadow-sm">
                  <SummaryCard
                    label="Absent"
                    interns={absentInterns}
                    color="red"
                    icon="/pictures/Pink.png"
                  />
                </div>
              </div>
            </div>

            {/* Tracking & Journal */}
            <div className="grid grid-cols-2 gap-6 h-[320px]">
              <TrackingCard
                title="Attendance Tracking"
                count={pendingAttendance}
                color="#FF4400"
                buttonLabel="Go to Attendance Tracking"
                onClick={handleCardNavigation}
              />
              <TrackingCard
                title="Journal Submission"
                count={unreadJournals}
                color="#FF4400"
                buttonLabel="Go to Journal Submissions"
                onClick={handleCardNavigation}
              />
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN (1/3) ---------------- */}
          <div className="space-y-6">
            {/* Intern overview */}
            <div className="bg-white p-6 rounded-[10px] shadow-md text-center h-[287px] border border-[#D9D9D9] group">
              <p className="text-[25px] text-start font-semibold text-[#1F3463]">
                Interns Overview
              </p>
              <div
                className="border-2 border-[#0385FF] h-[183px] rounded-[10px] mt-2 flex items-center justify-center relative overflow-hidden cursor-pointer group hover:bg-[#F5F6FA] transition"
                onClick={() => setShowModal(true)}
              >
                {/* Count block – fixed height so no jump */}
                <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0 absolute">
                  <div className="text-[90px] font-bold text-[#1F3463] h-[100px] flex items-center justify-center">
                    {loading ? (
                      <Skeleton width="150px" height="90px" />
                    ) : (
                      `${interns.length}`
                    )}
                  </div>
                  <p className="text-[20px] text-[#0059AB] font-medium mb-5 h-[30px] flex items-center justify-center">
                    {loading ? (
                      <Skeleton width="100px" height="24px" />
                    ) : (
                      "Current Committed Interns"
                    )}
                  </p>
                </div>
                {/* Hover text */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                  <button className="text-[#0059AB] text-[20px] font-medium cursor-pointer">
                    View Interns List
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <Calendar className="py-9.5" />
          </div>
        </div>

        {/* ---------------- Modal ---------------- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-[600px] max-h-[80vh] p-6 rounded-xl relative shadow-xl flex flex-col">
              {/* Header with close button and total count */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {interns.length} {interns.length === 1 ? 'intern' : 'interns'} total
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-black text-[25px] hover:text-gray-600 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="bg-[#1F3463] text-white text-[25px] font-semibold text-center py-3 rounded-[10px] mb-4 shadow-md">
                {company} Interns
              </div>

              {/* Content area */}
              <div className="flex-1 min-h-[300px] mb-4">
                {interns.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                    No interns found for this company
                  </div>
                ) : (
                  <ul className="text-[20px] space-y-2">
                    {paginatedInterns.map((user) => (
                      <li key={user._id} className="flex items-center gap-4 p-2 hover:bg-gray-50 transition-colors rounded">
                        <div className="w-[50px] h-[50px] bg-[#1F3463] text-white font-bold flex items-center justify-center rounded shadow-sm">
                          {`${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()}
                        </div>
                        <div className="flex-1 border-b border-gray-100 py-3">
                          <span className="font-medium text-gray-800">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Pagination */}
              {interns.length >= internsPerPage && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <StandardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    size="small"
                    className="text-[16px]"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const SummaryCard = ({ label, interns, color, icon }) => {
  const colorMap = {
    green: "text-[#6BD37C]",
    yellow: "text-[#F38A40]",
    red: "text-[#9B3F62]",
  };

  return (
    <div className={`bg-[#EDEEF3] p-4 rounded-[10px] shadow-sm  transition-shadow`}>
      <div className="flex justify-between items-center mt-5">
        <div>
          <div className={`text-[36px] font-bold text-[#1F3463] ${colorMap[color]}`}>
            {interns !== null ? (
              interns
            ) : (
              <div className="my-[7px]">
                <Skeleton width="40px" height="40px"/>
              </div>
            )}
          </div>
          <p className={`text-[18px] font-medium ${colorMap[color]}`}>Interns</p>
        </div>
        <img src={icon} alt={`${label} Icon`} className="w-[70px] mr-2" />
      </div>
      <p className={`text-start text-[22px] font-semibold mt-4 ${colorMap[color]}`}>
        {label}
      </p>
    </div>
  );
};

const TrackingCard = ({ title, count, color, buttonLabel, onClick }) => {
  // pick blue when there are no items, otherwise keep the color passed in
  const displayColor = count === 0 ? "#0059AB" : color;

  return (
    <div className="bg-white p-6 rounded-[10px] shadow-md text-center border border-[#D9D9D9] transition-shadow">
      <p className="text-[22px] font-semibold text-[#1F3463]">{title}</p>

      {/* count */}
      <h1
        className="flex justify-center font-bold text-[100px]"
        style={{ color: displayColor }}
      >
        {count !== null ? (
          count
        ) : (
          <div className="my-[25px]">
            <Skeleton width="70px" height="100px" />
          </div>
        )}
      </h1>

      {/* label */}
      <p
        className="text-[18px] font-medium"
        style={{ color: displayColor }}
      >
        {title.includes("Attendance")
          ? "Pending Attendance"
          : "Unread Journal Submissions"}
      </p>

      <button
        className="bg-[#0385FF] text-white mt-4 py-2 px-6 text-[18px] rounded-[8px] hover:bg-[#0576dd] transition-colors cursor-pointer"
        onClick={() => onClick(buttonLabel)}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default CompanyDashboard;
