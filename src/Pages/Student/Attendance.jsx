import React from 'react';
import Sidebar from '../PageComponents/sidebar';
import Footer from '../PageComponents/footer';
import Header from '../PageComponents/header';
import Skeleton from '../../components/Skeleton';
import useAttendance from '../../services/student/useAttendance';

const isValidDate = (dateStr) => {
  return dateStr && !isNaN(Date.parse(dateStr));
};

const toPHDate = (dateInput) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date)) return 'MM/DD/YYYY';
    return date.toLocaleDateString('en-PH', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return 'MM/DD/YYYY';
  }
};

const toPHTime = (dateInput) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date)) return '00:00:00';
    return date.toLocaleTimeString('en-PH', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return '00:00:00';
  }
};


function AttendanceSubmission() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    currentTime,
    timeIn,
    timeOut,
    attendanceSubmitted,
    submittedMessage,
    loading,
    canTimeIn,
    canTimeOut,
    handleTimeClick,
    handleSubmit,
    date,
  } = useAttendance();

  const showSubmitButton = (timeIn && timeOut) || attendanceSubmitted;

  return (
    <div className="flex min-h-screen relative bg-[#F5F6FA]">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out relative ${
          isSidebarExpanded ? 'ml-[400px]' : 'ml-[106px]'
        } bg-[#FAFAFF]`}
      >
        <Header isExpanded={isSidebarExpanded} />

        <div className="flex-1 flex items-center justify-center p-10 bg-[#F5F6FA]">
          <div className="flex gap-12 justify-center items-start">
            {/* Clock Display */}
            <div className="flex flex-col items-center mt-10">
              <div className="bg-white rounded shadow-md p-8 text-center w-[542px] text-[#2E2E2E] border border-gray-300 bg-[#E8E9EA]">
                <p className="text-[36px] font-semibold mb-3 tracking-wide">
                  {currentTime.toLocaleDateString("en-PH", {
                    timeZone: "Asia/Manila",
                    weekday: "long",
                  })}
                </p>
                <h1 className="text-[68px] font-bold tracking-tight leading-none">
                  {currentTime.toLocaleTimeString("en-PH", {
                    timeZone: "Asia/Manila",
                  })}
                </h1>
                <p className="text-[34px] mt-3 font-semibold text-[#555]">
                  {currentTime.toLocaleDateString("en-PH", {
                    timeZone: "Asia/Manila",
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </p>
              </div>

              <button
                onClick={handleTimeClick}
                className={`mt-6 py-3 text-[28px] w-full rounded font-semibold transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#1F3463] ${
                  attendanceSubmitted || (!canTimeIn && !canTimeOut)
                    ? "bg-[#727171] text-gray-100 cursor-not-allowed shadow-none"
                    : "bg-[#1F3463] hover:bg-[#2D0F7F] text-white shadow-lg cursor-pointer"
                }`}
                disabled={attendanceSubmitted || (!canTimeIn && !canTimeOut)}
                aria-label="Record Time In or Time Out"
              >
                {attendanceSubmitted ? "Time In" : canTimeIn ? "Time In" : "Time Out"}
              </button>

              {!submittedMessage && (
                <div className="h-[64px] flex items-center justify-center mt-4 px-4">
                  {timeIn && !timeOut ? (
                    <p className="text-[#0385FF] text-[25px] font-medium max-w-[300px] text-center select-none">
                      Time In Successfully! Time in at {(timeIn)}.
                    </p>
                  ) : timeOut ? (
                    <p className="text-[#0385FF] text-[25px] font-medium max-w-[300px] text-center select-none">
                      Time Out Successfully! Time out at {(timeOut)}.
                    </p>
                  ) : (
                    <div className="h-[25px]" />
                  )}
                </div>
              )}
            </div>

            {/* Time Info Summary */}
            <div className="w-[817px] flex flex-col">
              <div className="flex justify-evenly gap-[140px] text-sm text-gray-500 font-medium tracking-wide">
                <span></span>
                <span className="text-[28px]">Date</span>
                <span className="text-[28px] mb-1">Time</span>
              </div>

              {/* Time In Row */}
              <div className="bg-white py-[58px] text-[25px] shadow-md border border-gray-300 rounded mb-6 flex justify-evenly gap-[80px] text-[#2D0F7F] font-semibold items-center transition-shadow hover:shadow-lg">
                <span className="text-black select-text">Time In</span>
                <span className="text-[#556689] select-text">
                  {loading ? (
                    <Skeleton width="120px" height="28px" />
                  ) : (
                    timeIn ? date : "MM/DD/YYYY"
                  )}
                </span>
                <span className="text-[#556689] select-text">
                  {loading ? (
                    <Skeleton width="100px" height="28px" />
                  ) : (
                    (timeIn) || "00:00:00"
                  )}
                </span>
              </div>

              {/* Time Out Row */}
              <div className="bg-white py-[58px] text-[25px] shadow-md border border-gray-300 rounded mb-6 flex justify-evenly gap-[80px] text-[#2D0F7F] font-semibold items-center transition-shadow hover:shadow-lg">
                <span className="text-black select-text">Time Out</span>
                <span className="text-[#556689] select-text">
                  {loading ? (
                    <Skeleton width="120px" height="28px" />
                  ) : (
                    timeOut ? date : "MM/DD/YYYY"
                  )}
                </span>
                <span className="text-[#556689] select-text">
                  {loading ? (
                    <Skeleton width="100px" height="28px" />
                  ) : (
                    (timeOut) || "00:00:00"
                  )}
                </span>
              </div>

              {showSubmitButton && (
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleSubmit}
                    className={`text-[30px] font-semibold px-12 py-3 rounded text-white transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#1E3A8A] ${
                      submittedMessage
                        ? "bg-[#727171] text-gray-100 cursor-not-allowed shadow-none "
                        : "bg-[#1E3A8A] hover:bg-[#154374] shadow-lg cursor-pointer"
                    }`}
                    disabled={submittedMessage}
                    aria-label="Submit Attendance"
                  >
                    Submit Attendance
                  </button>
                  {submittedMessage && (
                    <p className="text-[#0385FF] text-[22px] text-center mt-5 font-medium select-none">
                      You have submitted your attendance!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AttendanceSubmission;
