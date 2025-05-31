import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbArrowBadgeRightFilled, TbArrowBadgeLeftFilled } from "react-icons/tb";


function Explore() {
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  const arrowBack = () => {
    navigate(-1);
  };

  const toggleLearnMore = () => {
    setShowLearnMore(true);
  };

  const goBackToMain = () => {
    setShowLearnMore(false);
  };

  const signUp = () => {
    navigate('/SignUp')
  }

  return (
    <div className="bg-[#F5F4FF] min-h-screen py-16 px-4 transition-all duration-500">
      {/* Back to previous page */}
      <div className="absolute top-10 left-6">
        <FaArrowLeft className="cursor-pointer h-[35px] w-[40px]" onClick={arrowBack} />
      </div>

      {/* MAIN VIEW */}
      {!showLearnMore && (
        <>
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[65px] md:text-[65px] text-[#1F3463] font-semibold mb-4">
              What FieldMate Offers
            </h1>
            <h6 className="text-[20px] text-[#1F3463] max-w-[1306px]">
              FieldMate provides a structured and efficient way to manage internship attendance and compliance.
              <br />Here’s what you can do:
            </h6>
          </div>

          {/* Cards */}
          <div className="mt-5 flex flex-row justify-center gap-10 px-4 relative">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition h-[550px] flex-shrink-0 max-w-[500px]">
              <img src="/pictures/E1.png" alt="Reliable Attendance" className="mx-auto h-[400px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2 text-center">Reliable Attendance Tracking</h3>
              <p className="text-gray-700 text-center mb-5 text-[18px] px-10">
                Students can submit attendance despite varying internship work setups.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition h-[550px] flex-shrink-0 max-w-[500px]">
              <img src="/pictures/E2.png" alt="Seamless Verification" className="mx-auto h-[400px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2 text-center">Seamless Verification</h3>
              <p className="text-gray-700 text-center mb-5 text-[18px] px-10">
                Daily journal submissions ensure attendance validation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition h-auto flex-shrink-0 max-w-[500px]">
              <img src="/pictures/E3.png" alt="Role-Based Resources" className="mx-auto h-[400px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2 text-center">Role-Based Resources</h3>
              <p className="text-gray-700 text-center mb-5 text-[18px] px-10" >
                Gain access to role-based materials tailored to your internship position.
              </p>
            </div>

            {/* RIGHT Arrow to show Learn More */}
            <div className="absolute right-10 top-[50%] transform -translate-y-1/2">
              <TbArrowBadgeRightFilled size={49}
                className="cursor-pointer text-black"
                onClick={toggleLearnMore}
              />
            </div>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-1">
            <span className="w-[10px] h-[10px] bg-[#8F8F8F] rounded-full"></span>
            <span className="w-[10px] h-[10px] bg-[#D9D9D9] rounded-full"></span>
          </div>

          {/* Sign Up Button (now back in main view) */}
          <div className="mt-5 flex justify-center">
            <button className="bg-[#1E3A8A] text-white text-[22px] px-10 py-3 rounded-lg font-semibold h-[65px]" onClick={signUp}>
              Sign Up Now
            </button>
          </div>
        </>
      )}

      {/* LEARN MORE SECTION */}
      {showLearnMore && (
        <div className="flex flex-col items-center text-center mx-auto transition-all duration-500 relative">
          {/* LEFT Arrow to go back */}
          <div className="absolute left-10 top-[50%] transform -translate-y-1/2">
            <TbArrowBadgeLeftFilled size={49}
              className="cursor-pointer text-black "
              onClick={goBackToMain}
            />
          </div>

          {/* Heading */}
          <h2 className="text-[65px] md:text-[40px] text-[#1F3463] font-semibold -mt-[1px] mb-4">
            Learn More About FieldMate
          </h2>
          
          {/* Paragraph */}
          <p className="text-[20px] text-gray-700 max-w-[1506px] mb-4">
            FieldMate is a streamlined platform for managing internship attendance, journals, and role-based resources <br />for students, coordinators, and companies.
          </p>

          {/* Carousel Cards */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6 max-w-[400px]">
              <img src="/pictures/E4.png" alt="Get Started" className="mx-auto mb-6 h-[330px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2">Get Started</h3>
              <p className="text-gray-700 text-[18px] px-10">Sign up and choose your role to begin your journey</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 max-w-[400px]">
              <img src="/pictures/E5.png" alt="Track Progress" className="mx-auto mb-6 h-[330px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2">Track Progress</h3>
              <p className="text-gray-700 text-[18px] px-10">Log your attendance and track your progress</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md p-6 max-w-[400px] h-[525px]">
              <img src="/pictures/E6.png" alt="Submit Journals" className="mx-auto mb-6 h-[330px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2">Submit Journals</h3>
              <p className="text-gray-700 text-[18px] px-10">Record and submit your tasks and reflections</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-md p-6 max-w-[400px]">
              <img src="/pictures/E7.png" alt="Access Resources" className="mx-auto mb-6 h-[330px]" />
              <h3 className="text-[#1F3463] font-bold text-[26px] mb-2">Access Resources</h3>
              <p className="text-gray-700 text-[18px] px-10">Find tools and materials related to your role</p>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-[34px] flex justify-center gap-1">
            <span className="w-[10px] h-[10px] bg-[#D9D9D9] rounded-full"></span>
            <span className="w-[10px] h-[10px] bg-[#8F8F8F] rounded-full"></span>
          </div>

          {/* Sign Up Button */}
          <div className="mt-5 flex justify-center">
            <button className="bg-[#1E3A8A] text-white text-[22px] px-10 py-3 rounded-lg font-semibold h-[65px]" onClick={signUp}>
              Sign Up Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
