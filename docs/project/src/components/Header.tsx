import React, { useState, useEffect } from 'react';

interface HeaderProps {
  title: string;
  date: Date;
  onDateChange: (date: Date) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Header: React.FC<HeaderProps> = ({ title, date, onDateChange }) => {
  // Controlled values
  const selectedYear = 2026;
  const selectedMonth = date.getMonth();
  const selectedDay = date.getDate();
  const days = Array.from({ length: daysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  // Handlers
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value);
    const maxDay = daysInMonth(newMonth, selectedYear);
    const newDay = Math.min(selectedDay, maxDay);
    onDateChange(new Date(selectedYear, newMonth, newDay));
  };
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(selectedYear, selectedMonth, Number(e.target.value)));
  };
  // Only 2025 allowed, but keep handler for future extensibility
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(new Date(Number(e.target.value), selectedMonth, selectedDay));
  };

  return (
    <header className="text-center py-6">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <div className="flex justify-center items-center gap-2 mt-2">
        {/* Month Dropdown */}
        <select
          className="border rounded justify-center items-center px-2 py-1 text-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, idx) => (
            <option key={month} value={idx}>{month}</option>
          ))}
        </select>
        {/* Day Dropdown */}
        <select
          className="border rounded justify-center items-center px-2 py-1 text-sm"
          value={selectedDay}
          onChange={handleDayChange}
        >
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        {/* Year Dropdown (only 2026) */}
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value={2026}>2026</option>
          <option value={2025}>2025</option>
        </select>
      </div>
    </header>
  );
};

export default Header;