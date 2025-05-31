import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import secureAxios from "../services/secureAxios";

function CompanyDashboardStats({ onDataReady }) {
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Helper to normalize dates like "5/21/2025" into "2025-05-21"
  const normalizeToISODate = (dateStr) => {
    if (!dateStr) return "";
    // Handle ISO dates like "2025-05-30"
    if (dateStr.includes("-")) return dateStr;

    // Handle MM/DD/YYYY
    const [month, day, year] = dateStr.split("/");
    if (!month || !day || !year) return "";
    const isoDate = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    return isoDate.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user?.email) return;

      try {
        // Replace fetch with secureAxios
        const userRes = await secureAxios.get(`${BASE_URL}/user`, {
          params: { email: user.email }
        });
        const userData = userRes.data;
        const company = userData.company;

        const [attendanceRes, journalRes, usersRes] = await Promise.all([
          secureAxios.get(`${BASE_URL}/attendance`),
          secureAxios.get(`${BASE_URL}/journal`),
          secureAxios.get(`${BASE_URL}/users`)
        ]);

        const attendances = attendanceRes.data;
        const journals = journalRes.data;
        const users = usersRes.data;

        const today = new Date().toLocaleDateString("en-CA"); 

        const interns = Array.isArray(users)
          ? users.filter((u) => u.role === "student" && u.company === company)
          : [];

        const todaysAttendances = Array.isArray(attendances)
          ? attendances.filter(
              (a) => a.company === company && normalizeToISODate(a.date) === today
            )
          : [];

        const presentInterns = todaysAttendances.length;

        const lateInterns = todaysAttendances.filter((a) => {
          if (!a.timeIn) return false;
          const [time, modifier] = a.timeIn.split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          if (modifier === "PM" && hours !== 12) hours += 12;
          if (modifier === "AM" && hours === 12) hours = 0;
          return hours > 8 || (hours === 8 && minutes >= 15);
        }).length;

        const presentEmails = todaysAttendances.map((a) => a.email);

        const pendingAttendance = attendances.filter(
          (a) => a.company === company && !a.approved && !a.denied
        ).length;

        const unreadJournals = journals.filter(
          (j) => j.company === company && j.removed !== true && j.viewed !== true
        ).length;

        onDataReady({
          presentInterns,
          lateInterns,
          pendingAttendance,
          unreadJournals,
        });
      } catch (err) {
        console.error("Failed to load company dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    const unsub = onAuthStateChanged(auth, fetchData);
    return () => unsub();
  }, []);

  return loading ? (
    <div className="text-center w-full col-span-3">
      <p className="text-[24px] text-gray-500 animate-pulse">Loading dashboard stats...</p>
    </div>
  ) : null;
}

export default CompanyDashboardStats;
