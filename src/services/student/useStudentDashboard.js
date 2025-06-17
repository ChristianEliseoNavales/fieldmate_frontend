import { useNavigate } from "react-router-dom";

const useStudentDashboard = () => {
  const navigate = useNavigate();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthName = today.toLocaleString("default", { month: "long" });
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return {
    navigate,
    today,
    currentYear,
    currentMonth,
    monthName,
    firstDay,
    daysInMonth
  };
};

export default useStudentDashboard;
