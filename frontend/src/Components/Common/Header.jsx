import React from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-line">
      <AnnouncementBar />
      <Navbar />
    </header>
  );
};

export default Header;
