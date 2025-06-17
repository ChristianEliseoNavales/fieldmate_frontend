import { useState } from "react";

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // system date
  const [viewDate, setViewDate] = useState(new Date()); // current view month/year
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (year, month) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const nextMonth = () => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = daysInMonth(year, month);
  const offset = firstDayOffset(year, month);

  const isToday = (day) =>
    day === currentDate.getDate() &&
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear();

  const isTargetDate = (day) => day === 15 && month === 1 && year === 2024;

  const handleClick = (day) => {
    setSelectedDate(new Date(year, month, day));
    // You can add additional logic here (e.g. open a modal, mark attendance, etc.)
  };

  return {
    currentDate,
    viewDate,
    selectedDate,
    monthNames,
    year,
    month,
    days,
    offset,
    prevMonth,
    nextMonth,
    isToday,
    isTargetDate,
    handleClick
  };
};

export default useCalendar;
