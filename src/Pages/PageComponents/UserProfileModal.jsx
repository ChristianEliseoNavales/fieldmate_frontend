import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCog, FaKey, FaSignOutAlt } from "react-icons/fa";
import AccountSettingsModal from './AccountSettingModal';
import ChangePass from './ChangePass'; 
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { useNavigate } from "react-router-dom";
import secureAxios from '../../services/secureAxios';  // <-- import secureAxios

const UserProfileModal = ({ name, initials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        try {
          // Use secureAxios instead of fetch to include token
          const res = await secureAxios.get(`${BASE_URL}/user`, {
            params: { email: user.email }
          });
          const data = res.data;
          if (data && data.firstName && data.lastName && data.email) {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
          } else {
            console.warn("User data not found or incomplete:", data);
          }
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountSettingsClick = () => {
    setIsOpen(false);
    setIsAccountSettingsOpen(true);
  };

  const handleChangePasswordClick = () => {
    setIsOpen(false);
    setIsChangePasswordOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("companySelectedDate");
      localStorage.removeItem("selectedJournalDate");
      setTimeout(() => {
        navigate("/SignIn");
      }, 100);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const getInitials = (firstName, lastName) => {
    const getFirstInitial = (str) => {
      const firstWord = str?.trim().split(" ")[0] || "";
      return firstWord.charAt(0).toUpperCase();
    };

    return `${getFirstInitial(firstName)}${getFirstInitial(lastName)}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center gap-3 bg-[#F1F1F1] pl-2 pr-4 py-2 text-[18px] border border-[#1F3463]  w-[300px] rounded cursor-pointer"
      >
        <span className="bg-[#1F3463] text-white font-bold p-2 text-[22px] rounded">
          {initials}
        </span>
        <div>{name}</div>
        <FaChevronDown className="h-4 w-4 text-[#494949]" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[430px] bg-white border border-gray-200 shadow-lg rounded z-50">
          <div className="flex px-4 py-6 gap-3">
            <div className="bg-[#1F3463] text-white flex items-center justify-center text-[28px] font-bold h-[75px] w-[70px] rounded-[10px]">
              {getInitials(firstName, lastName)}
            </div>
            <div className="flex-col content-center">
              <p className="text-[26px] font-semibold">{firstName} {lastName}</p>
              <p className="text-[14px]">{email}</p>
            </div>
          </div>
          <p className="border-t border-[#959494]"></p>
          <ul className="p-2 text-[23px]">
            {/* Uncomment this if needed
            <li
              className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer"
              onClick={handleAccountSettingsClick}
            >
              <FaCog className="h-7 w-7" />
              Account Settings
            </li>
            */}
            <li
              className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer"
              onClick={handleChangePasswordClick}
            >
              <FaKey className="h-7 w-7" />
              Change Password
            </li>
            <hr className="my-1 border-gray-200" />
            <li
              className="flex items-center gap-2 p-2 hover:bg-[#E8EEFF] cursor-pointer"
              onClick={() => setIsLogoutConfirmOpen(true)}
            >
              <FaSignOutAlt className="h-7 w-7" />
              Logout
            </li>
          </ul>
        </div>
      )}

      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        closeModal={() => setIsAccountSettingsOpen(false)}
      />

      <ChangePass
        isOpen={isChangePasswordOpen}
        closeModal={() => setIsChangePasswordOpen(false)}
      />

      <LogoutConfirmationModal
        isOpen={isLogoutConfirmOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutConfirmOpen(false)}
      />
    </div>
  );
};

export default UserProfileModal;
