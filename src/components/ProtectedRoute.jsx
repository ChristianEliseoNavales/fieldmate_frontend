import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import secureAxios from "../services/secureAxios";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [status, setStatus] = useState("checking"); // 'checking' | 'authorized' | 'unauthorized'
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthorized");
        return;
      }

      try {
        const res = await secureAxios.get(`${BASE_URL}/user`, {
          params: { email: user.email },
        });

        const data = res.data;

        if (data?.role) {
          setUserRole(data.role);

          if (allowedRoles.includes(data.role)) {
            setStatus("authorized");
          } else {
            setStatus("unauthorized");
          }
        } else {
          setStatus("unauthorized");
        }
      } catch (err) {
        console.error("Role check error:", err);
        setStatus("unauthorized");
      }
    });

    return () => unsubscribe();
  }, [allowedRoles]);

  useEffect(() => {
    if (status === "unauthorized") {
      if (userRole === "Student") {
        navigate("/StudentDashboard", { replace: true });
      } else if (userRole === "Coordinator") {
        navigate("/CompanyDashboard", { replace: true });
      } else if (userRole === "Admin") {
        navigate("/AdminDashboard", { replace: true });
      } else {
        navigate("/SignIn", { replace: true });
      }
    }
  }, [status, userRole, navigate]);

  if (status === "checking") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAFF]">
        <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
