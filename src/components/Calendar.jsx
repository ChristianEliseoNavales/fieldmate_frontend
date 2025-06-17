import { useState } from 'react';

const Calendar = ({ className = '' }) => {
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

  return (
    <div className={`bg-white p-12 rounded-xl shadow-md border border-[#D1D5DB] ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 ml-10 mr-10">
        <button onClick={prevMonth} className="px-2 text-[23px]">&lt;</button>
        <p className="font-semibold text-center text-[23px]">{monthNames[month]} {year}</p>
        <button onClick={nextMonth} className="px-2 text-[23px]">&gt;</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-[23px] gap-2 text-center text-gray-500 mb-4">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
          <div key={i} className="font-bold">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-[23px] gap-2 text-center">
        {Array.from({ length: offset + days }).map((_, i) => {
          const day = i - offset + 1;
          const dateObj = new Date(year, month, day);

          const baseStyle = 'py-3 rounded cursor-pointer';
          const todayStyle = isToday(day) ? 'bg-black text-white font-bold' : '';
          const targetStyle = isTargetDate(day) ? 'bg-[#2D0F7F] text-white font-semibold' : '';
          const selectedStyle = selectedDate?.toDateString() === dateObj.toDateString()
            ? 'ring-2 ring-blue-600'
            : '';

          return (
            <div
              key={i}
              className={`${baseStyle} ${todayStyle} ${targetStyle} ${selectedStyle}`}
              onClick={() => day > 0 && handleClick(day)}
            >
              {day > 0 ? day : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
