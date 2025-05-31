import React, { useState } from "react";
import secureAxios from "../../services/secureAxios";  // <-- replaced axios import
import { FaArrowLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ForgotPassword({ isOpen, onClose, email, setEmail }) {
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [maxedOut, setMaxedOut] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!isOpen) return null;

  const handleOtpChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const resetState = () => {
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
    setAttempts(0);
    setMaxedOut(false);
    setLoading(false);
  };

  const handleContinue = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (step === "email") {
        await secureAxios.post(`${BASE_URL}/auth/request-otp`, { email });
        setStep("otp");
      } else if (step === "otp") {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) {
          setMessage("Please enter a 6-digit OTP.");
          setLoading(false);
          return;
        }

        await secureAxios.post(`${BASE_URL}/auth/verify-otp`, { email, otp: enteredOtp });
        setStep("reset");
      } else {
        if (newPassword !== confirmPassword) {
          setMessage("Passwords do not match.");
          setLoading(false);
          return;
        }

        await secureAxios.post(`${BASE_URL}/auth/reset-password`, { email, newPassword });
        setStep("success");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || "Something went wrong";

      if (step === "otp") {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (serverMsg.includes("Too many") || newAttempts >= 3) {
          setMaxedOut(true);
          setMessage("Maximum attempts reached. Please try again after 10 minutes.");
        } else {
          setMessage(serverMsg || "Incorrect OTP. Try again.");
        }
      } else {
        setMessage(serverMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (maxedOut || step === "success") return;
    if (step === "reset") setStep("otp");
    else if (step === "otp") setStep("email");
    else {
      resetState();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm w-screen h-screen m-0 p-0">
      <div className="bg-white p-6 rounded-lg w-full max-w-[647px] relative">

        {/* Back Button (only shown when not maxed out or on success) */}
        {step !== "reset" && step !== "success" && !maxedOut && (
          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <IoMdClose size={30} />
          </button>
        )}

        {/* Step 1: Email Input */}
        {step === "email" && (
          <>
            <h2 className="text-[50px] font-bold text-center pt-4">Forgot Password</h2>
            <p className="mb-8 -mt-1 text-[21px] text-gray-600 text-center">
              Please enter your email to reset your password.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-5 border border-[#D3CECE] rounded mb-4 text-[21px]"
            />
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <>
            <h2 className="text-[50px] font-bold mb-4 text-center pt-4">Verification</h2>
            <p className="mb-2 text-[21px] text-[#959494] text-center">
              Please enter the code sent to your email.
            </p>
            <p className="text-center text-[20px] mb-2">Enter OTP</p>
            <div className="flex justify-center mb-4 font-bold gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-14 h-14 text-center text-[22px] border border-gray-300 rounded"
                  disabled={maxedOut}
                />
              ))}
            </div>
            {!maxedOut && (
              <p className="text-center text-sm text-gray-500 mb-2">
                Attempt {attempts} of 3
              </p>
            )}
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <>
            <h2 className="text-[50px] font-bold -mb-2 text-center pt-4">Reset Password</h2>
            <p className="mb-6 text-[21px] text-[#959494] text-center">
              Set the new password for your account.
            </p>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-4 border border-[#D3CECE] rounded mb-3 text-[21px] text-[#5F5454] pr-12"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-4 border border-[#D3CECE] rounded mb-4 text-[21px] text-[#5F5454] pr-12"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="text-center">
            <FaCheckCircle className="text-[#1E3A8A] mx-auto mt-5 border-10 border-[#1E3A8A] rounded-full px-1 " size={130} />
            <h2 className="text-[40px] font-bold text-black mt-6">Successful!</h2>
            <p className="text-[18px] mt-2 text-gray-700">You may now sign in using your new password.</p>
            <button
              className="mt-6 h-[56px] bg-[#1E3A8A] text-white text-[22px] font-semibold px-4 py-2 rounded w-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                resetState();
                onClose();
              }}
            >
              Continue to Log In
            </button>
          </div>
        )}

        {/* Message Prompt */}
        {message && step !== "success" && (
          <p
            className={`mt-2 mb-4 text-center ${
              maxedOut ? "text-red-600" : "text-[#FF0000]"
            }`}
          >
            {message}
          </p>
        )}

        {/* Continue or Resend Button */}
        {!maxedOut && step !== "success" && (
          <button
            onClick={handleContinue}
            disabled={
              loading ||
              (step === "email" && !email) ||
              (step === "otp" && otp.some((val) => val === "")) ||
              (step === "reset" && (!newPassword || !confirmPassword))
            }
            className="mt-2 h-[56px] bg-[#1E3A8A] text-white text-[22px] font-semibold px-4 py-2 rounded w-full flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : step === "reset" ? "Reset Password" : "Continue"}
          </button>
        )}

        {/* Back Button */}
        {!maxedOut && step !== "email" && step !== "success" && (
          <button
            onClick={handleBack}
            className="mt-4 h-[56px] border border-[#1E3A8A] text-[#1E3A8A] text-[22px] font-semibold px-4 py-2 rounded w-full flex items-center justify-center cursor-pointer hover:bg-[#1E3A8A] hover:text-white transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
