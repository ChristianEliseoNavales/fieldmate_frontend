import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserProfileModal from "./UserProfileModal";
import Skeleton from "../../components/Skeleton";
import secureAxios from "../../services/secureAxios";

function AdminHeader({ isExpanded }) {
  const location = useLocation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const pageTitles = {
    "/AdminDashboard": "Admin Dashboard",
    "/CompanyList": "Company List",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cachedUser = localStorage.getItem("userInfo");

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user?.email) {
          try {
            // Use secureAxios instead of fetch
            const res = await secureAxios.get(`/user?email=${user.email}`);
            const data = res.data;
            if (data?.firstName && data?.lastName && data?.email) {
              localStorage.setItem("userInfo", JSON.stringify(data));
              setFirstName(data.firstName);
              setLastName(data.lastName);
              setEmail(data.email);
            } else {
              console.warn("User data not found or incomplete:", data);
            }
          } catch (error) {
            console.error("Failed to fetch user info:", error);
          } finally {
            setLoading(false);
          }
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const getInitials = (firstName, lastName) => {
    const getFirstInitial = (str) => {
      const firstWord = str?.trim().split(" ")[0] || "";
      return firstWord.charAt(0).toUpperCase();
    };

    return `${getFirstInitial(firstName)}${getFirstInitial(lastName)}`;
  };

  return (
    <header
      className={`fixed top-0 z-40 flex justify-between items-center h-[100px] px-10 bg-[#F5F6FA] transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        left: isExpanded ? 400 : 100,
        width: `calc(100% - ${isExpanded ? 400 : 100}px)`,
      }}
    >
      <h1 className="text-[28px] font-semibold">{title}</h1>

      <div className="flex items-center">
        <UserProfileModal
          name={
            loading ? (
              <Skeleton width="100px" height="20px" />
            ) : (
              `${firstName} ${lastName}`
            )
          }
          initials={
            loading ? (
              <Skeleton width="24px" height="24px" />
            ) : (
              getInitials(firstName, lastName)
            )
          }
        />
      </div>
    </header>
  );
}

export default AdminHeader;
