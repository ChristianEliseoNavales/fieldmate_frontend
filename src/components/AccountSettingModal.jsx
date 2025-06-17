import React, { useState } from "react";

const AccountSettingsModal = ({ isOpen, closeModal }) => {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleSave = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      {/* Blurry background */}
      <div className="absolute inset-0 bg-opacity-60 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-[667px] relative z-10">
        <div className="p-6 border border-[#BABABA] rounded-[8px]">
          <div className="text-[22px] font-semibold text-center border-5 border-[#E8E9EA] rounded-[10px] py-1">
            Account Settings
          </div>
          <div className="border border-[#C4C4C4] mt-3 rounded-[10px] p-4">
            <p className="text-[43px] font-semibold text-[#3F3F46]">Account</p>
            <p className="text-gray-500 text-[21px]">
              Make changes to your account. Click save when you're done.
            </p>

            <div className="space-y-4 mt-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="current-username"
                  className="text-[20px] font-semibold text-[#3F3F46]"
                >
                  Current Username
                </label>
                <input
                  id="current-username"
                  value={currentUsername}
                  onChange={(e) => setCurrentUsername(e.target.value)}
                  className="border border-[#C4C4C4] rounded p-5"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label
                  htmlFor="new-username"
                  className="text-[20px] font-semibold text-[#3F3F46]"
                >
                  New Username
                </label>
                <input
                  id="new-username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border border-[#C4C4C4] rounded p-5 "
                />
              </div>
            </div>
            <div className="flex mt-6 gap-2 font-semibold">
              <button
                className="px-4 py-2 text-gray-700 border border-[#C4C4C4] rounded-[10px] bg-[#F5F5F5] w-1/2 text-[23px] cursor-pointer"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded w-1/2 text-[23px] rounded-[10px] cursor-pointer"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsModal;
