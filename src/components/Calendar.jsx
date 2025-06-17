import React from 'react';
import useCalendar from '../services/use/useCalendar';

const Calendar = ({ className = '' }) => {
  const {
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
  } = useCalendar();

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
