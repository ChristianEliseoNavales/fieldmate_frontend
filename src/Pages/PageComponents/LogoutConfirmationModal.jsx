// components/LogoutConfirmationModal.jsx
import React from "react";

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[650px] text-center">
        <p className="mb-4 text-[24px] text-[#374151] font-medium">
          Confirm Logout
        </p>
        <p className="mb-6 text-[18px] text-[#6B7280]">
          Are you sure you want to <span className="font-bold">Log Out</span>?
        </p>
        <div className="flex justify-center text-[18px] gap-4">
          <button
            className="px-5 py-2 bg-[#64AD70] text-white rounded-lg w-[140px] hover:brightness-90 transition"
            onClick={onConfirm}
          >
            YES
          </button>
          <button
            className="px-5 py-2 bg-[#D84040] text-white rounded-lg w-[140px] hover:brightness-90 transition"
            onClick={onCancel}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
