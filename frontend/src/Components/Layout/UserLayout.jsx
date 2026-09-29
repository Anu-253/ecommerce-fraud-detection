import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import AIChatButton from '../AI/AIChatButton';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIChatButton />
    </>
  );
};

export default UserLayout;
