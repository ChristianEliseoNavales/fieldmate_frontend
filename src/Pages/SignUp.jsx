import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import useCreateAccount from "../services/useCreateAccount";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const {
    step,
    showPassword,
    showConfirmPassword,
    firstName,
    lastName,
    email,
    role,
    supervisorNumber,
    company,
    arrangement,
    password,
    confirmPassword,
    companies,
    error,
    setShowPassword,
    setShowConfirmPassword,
    setFirstName,
    setLastName,
    setEmail,
    setRole,
    setSupervisorNumber,
    setCompany,
    setArrangement,
    setPassword,
    setConfirmPassword,
    handleBack,
    login,
    onContinue,
    onSignup,
    errorFields,
  } = useCreateAccount();

  const navigate = useNavigate();

  // Refs for Step 1
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const supervisorNumberRef = useRef();
  const roleRef = useRef();

  // Refs for Step 2
  const companyRef = useRef();
  const arrangementRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    const refs = {
      firstName: firstNameRef,
      lastName: lastNameRef,
      email: emailRef,
      role: roleRef,
      supervisorNumber: supervisorNumberRef,
      company: companyRef,
      arrangement: arrangementRef,
      password: passwordRef,
      confirmPassword: confirmPasswordRef,
    };

    const firstErrorKey = Object.keys(errorFields)[0];
    if (firstErrorKey && refs[firstErrorKey]?.current) {
      refs[firstErrorKey].current.focus();
    }
  }, [errorFields]);

  return (
    <div className="flex h-screen font-poppins">
      {/* Left */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-12 relative">
        <div className="absolute top-6 left-6 flex items-center space-x-4">
          <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate("/homepage")} />
        </div>
        <div className="absolute top-6 right-6">
          <img src="/pictures/logo.png" alt="Logo" className="w-14 h-14" />
        </div>

        <div className="w-full max-w-md space-y-4">
          <h1 className="text-[50px] font-bold text-center mb-0">Create Account</h1>
          <p className="text-[20px] text-center font-normal">
            Step {step} of 2
          </p>
          {error && <p className="text-red-600 text-center text-md">{error}</p>}
        </div>

        {step === 1 && (
          <div className="w-full max-w-md space-y-4">
            <div className="flex space-x-2 mt-10">
              <input
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`text-[#5F5454] text-[20px] rounded p-3 w-1/2 border ${errorFields.firstName ? "border-red-500" : "border-[#D3CECE]"}`}
              />
              <input
                ref={lastNameRef}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`text-[#5F5454] text-[20px] rounded p-3 w-1/2 border ${errorFields.lastName ? "border-red-500" : "border-[#D3CECE]"}`}
              />
            </div>

            <input
              ref={emailRef}
              type="email"
              placeholder="LV Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border text-[#5F5454] text-[20px] rounded p-3 w-full ${errorFields.email ? "border-red-500" : "border-[#D3CECE]"}`}
            />

            <div className="relative">
              <select
                ref={roleRef}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`cursor-pointer appearance-none border text-[#5F5454] text-[20px] rounded p-3 w-full pr-10 ${errorFields.role ? "border-red-500" : "border-[#D3CECE]"}`}
              >
                <option>Student</option>
                <option>Coordinator</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>

            {role === "Coordinator" && (
              <input
                ref={supervisorNumberRef}
                type="text"
                placeholder="Admin Code"
                value={supervisorNumber}
                onChange={(e) => setSupervisorNumber(e.target.value)}
                className={`text-[#5F5454] text-[20px] rounded p-3 w-full border ${errorFields.supervisorNumber ? "border-red-500" : "border-[#D3CECE]"} mb-10`}
              />
            )}

            <button onClick={onContinue} className="w-full bg-[#1E3A8A] text-white py-3 rounded text-[18px] font-bold cursor-pointer hover:bg-[#1F3463] transition duration-300">Continue</button>
            <p className="text-center text-[18px]">
              Already have an Account? <span className="text-[#005CFA] cursor-pointer font-medium" onClick={login}>Log In</span>
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md space-y-4">
            <div className="relative mt-10">
              <select
                ref={companyRef}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`appearance-none border text-[#5F5454] bg-white text-[20px] rounded p-3 w-full pr-10 ${errorFields.company ? "border-red-500" : "border-[#D3CECE]"}`}
              >
                {companies.map((comp) => (
                  <option key={comp._id} value={comp.name}>{comp.name}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>

            <div className="relative">
              <select
                ref={arrangementRef}
                value={arrangement}
                onChange={(e) => setArrangement(e.target.value)}
                className={`appearance-none border text-[#5F5454] bg-white text-[20px] rounded p-3 w-full pr-10 ${errorFields.arrangement ? "border-red-500" : "border-[#D3CECE]"}`}
              >
                <option>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
              <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3] pointer-events-none" />
            </div>

            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`text-[#5F5454] text-[20px] rounded p-3 w-full border ${errorFields.password ? "border-red-500" : "border-[#D3CECE]"}`}
              />
              {showPassword ? (
                <FaEye className="absolute right-4 top-4 text-[#5F5454] cursor-pointer" onClick={() => setShowPassword(false)} />
              ) : (
                <FaEyeSlash className="absolute right-4 top-4 text-[#B3B3B3] cursor-pointer" onClick={() => setShowPassword(true)} />
              )}
            </div>

            <div className="relative mb-10">
              <input
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`text-[#5F5454] text-[20px] rounded p-3 w-full border ${errorFields.confirmPassword ? "border-red-500" : "border-[#D3CECE]"}`}
              />
              {showConfirmPassword ? (
                <FaEye className="absolute right-4 top-4 text-[#5F5454] cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <FaEyeSlash className="absolute right-4 top-4 text-[#B3B3B3] cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              <button onClick={handleBack} className="border border-[#D3CECE] w-1/2 bg-[#F5F5F5] text-black py-3 rounded text-[18px] font-bold cursor-pointer hover:bg-[#E0E0E0] transition duration-300">Back</button>
              <button onClick={onSignup} className="w-1/2 bg-[#1E3A8A] text-white py-3 rounded text-[18px] font-bold cursor-pointer hover:bg-[#1F3463] transition duration-300">Sign Up</button>
            </div>

            <p className="text-center text-[18px]">
              Already have an Account?{" "}
              <span className="text-[#005CFA] cursor-pointer font-medium" onClick={login}>Log In</span>
            </p>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="w-1/2">
        <img src="/pictures/SIGNUP.png" alt="School Gate" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
