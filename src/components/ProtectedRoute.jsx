import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [status, setStatus] = useState("checking"); // 'checking' | 'authorized' | 'unauthorized'
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthorized");
        return;
      }

      try {
        const res = await fetch(`${baseURL}/user?email=${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();

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
      // Redirect based on known role or fallback to SignIn
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
