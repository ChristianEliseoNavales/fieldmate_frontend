import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import secureAxios from "../../services/secureAxios";

export default function useAttendance() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [date, setDate] = useState("");
  const [recordId, setRecordId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [canTimeIn, setCanTimeIn] = useState(false);
  const [canTimeOut, setCanTimeOut] = useState(false);
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Keep live clock in PH time
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const phTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
      setCurrentTime(phTime);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAttendance = async (email) => {
      const start = Date.now();
      try {
        const res = await secureAxios.get(`${BASE_URL}/attendance/today`, {
          params: { email },
        });

      if (res.data) {
        console.log("✅ Attendance fetched:", res.data);
        console.log("✅ setTimeIn:", res.data.timeIn);
        console.log("✅ setTimeOut:", res.data.timeOut);
        console.log("✅ Date:", res.data.date);
        setRecordId(res.data._id);
        setTimeIn(res.data.timeIn ?? null);
        setTimeOut(res.data.timeOut ?? null);
        setDate(res.data.date ?? null);
        setAttendanceSubmitted(!!res.data.submitted);
        setSubmittedMessage(!!res.data.submitted);
        setCanTimeIn(!res.data.timeIn);
        setCanTimeOut(!!res.data.timeIn && !res.data.timeOut);
      } else {
        setCanTimeIn(true);
      }

      } catch (err) {
        if (err.response?.status === 404) {
          setCanTimeIn(true);
        } else {
          console.error("❌ Error fetching attendance:", err);
        }
      } finally {
        const elapsed = Date.now() - start;
        const delay = Math.max(300 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        await checkAttendance(user.email);
      }
    });

    return () => unsubscribe();
  }, [BASE_URL]);

  const handleTimeClick = async () => {
    if (canTimeIn) {
      try {
        const res = await secureAxios.post(`${BASE_URL}/attendance/timein`, {
          email: userEmail,
        });
        setRecordId(res.data._id);
        setTimeIn(res.data.timeIn);
        setDate(res.data.date);
        setCanTimeIn(false);
        setCanTimeOut(true);
      } catch (err) {
        console.error("❌ Failed to time in:", err);
      }
    } else if (canTimeOut && recordId) {
      try {
        const res = await secureAxios.put(
          `${BASE_URL}/attendance/timeout/${recordId}`
        );
        setTimeOut(res.data.timeOut); // Raw ISO string
        setCanTimeOut(false);
      } catch (err) {
        console.error("❌ Failed to time out:", err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await secureAxios.put(`${BASE_URL}/attendance/submit/${recordId}`);
      setAttendanceSubmitted(true);
      setSubmittedMessage(true);
    } catch (err) {
      console.error("❌ Failed to submit attendance:", err);
    }
  };

  return {
    isSidebarExpanded,
    setIsSidebarExpanded,
    currentTime,
    timeIn,
    timeOut,
    attendanceSubmitted,
    submittedMessage,
    loading,
    canTimeIn,
    canTimeOut,
    handleTimeClick,
    handleSubmit,
    date,
  };
}
