import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center gap-3 text-white mb-16">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <h1 className="text-2xl font-medium">Create a new Persona</h1>
    </div>
  );
};

export default Header;