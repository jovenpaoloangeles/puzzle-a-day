import React from 'react';

interface HeaderProps {
  title: string;
  date: Date;
}

const Header: React.FC<HeaderProps> = ({ title, date }) => {
  let formattedDate = '';
  if (date instanceof Date && !isNaN(date.getTime())) {
    formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } else {
    formattedDate = 'Invalid date';
  }

  return (
    <header className="text-center py-6">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <p className="text-lg text-gray-600 mt-2">{formattedDate}</p>
    </header>
  );
};

export default Header;