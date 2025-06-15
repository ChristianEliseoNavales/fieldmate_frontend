import { useEffect, useState } from "react";
import secureAxios from "../services/secureAxios";

const useAttendanceSummaryStats = (firstName, lastName) => {
  const [summary, setSummary] = useState({
    presentDays: 0,
    lateHours: 0,
    absentDays: 0,
    totalHours: 0,
    remainingDays: 0,
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchStats = async () => {
      if (!firstName || !lastName) return;

      try {
        const response = await secureAxios.get(`${BASE_URL}/attendance`);
        const data = response.data;

        const userRecords = data.filter(
          (r) =>
            r.firstName === firstName &&
            r.lastName === lastName &&
            r.denied === false
        );

        const allUserRecords = data.filter(
          (r) => r.firstName === firstName && r.lastName === lastName
        );

        // Present Days
        const presentDays = userRecords.length;

        // Late Hours
        let totalLate = 0;
        userRecords.forEach((r) => {
          if (r.timeIn) {
            const refTime = new Date(`1970-01-01T08:00:00`);
            const timeIn = new Date(`1970-01-01T${to24Hr(r.timeIn)}`);
            const diff = timeIn - refTime;
            if (diff > 0) {
              totalLate += diff / (1000 * 60 * 60);
            }
          }
        });

        // Total Hours
        const totalHours = userRecords.reduce(
          (acc, r) => acc + (parseFloat(r.hours) || 0),
          0
        );

        // Absent Days
        let absentDays = 0;
        const recordDates = new Set(
          allUserRecords.map((r) => new Date(r.date).toDateString())
        );

        if (allUserRecords.length > 0) {
          const sortedDates = allUserRecords
            .map((r) => new Date(r.date))
            .sort((a, b) => a - b);

          const startDate = new Date(sortedDates[0]);
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);

          for (
            let d = new Date(startDate);
            d <= yesterday;
            d.setDate(d.getDate() + 1)
          ) {
            const dayOfWeek = d.getDay();
            const dateStr = d.toDateString();

            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !recordDates.has(dateStr)) {
              absentDays++;
            }
          }

          // Check if today has a denied record
          const todayStr = today.toDateString();
          const todayDenied = allUserRecords.some(
            (r) => new Date(r.date).toDateString() === todayStr && r.denied === true
          );

          if (todayDenied && today.getDay() !== 0 && today.getDay() !== 6) {
            absentDays++;
          }
        }

        setSummary({
          presentDays,
          lateHours: totalLate.toFixed(1),
          totalHours: totalHours.toFixed(1),
          remainingDays: Math.floor(totalHours / 8),
          absentDays,
        });
      } catch (err) {
        console.error("Error fetching attendance stats:", err);
      }
    };

    fetchStats();
  }, [firstName, lastName]);

  const to24Hr = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(" ")) return "00:00:00";
    const [time, modifier] = timeStr.split(" ");
    const parts = time.split(":");
    if (parts.length < 2) return "00:00:00";
    let [hours, minutes] = parts.map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  return summary;
};

export default useAttendanceSummaryStats;