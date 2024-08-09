import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import LandingPage from './pages/landingpage/landingpage';
// import { AppProvider } from '../src/pages/landingpage/context';
import AdminLandingPage from './pages/landingpage/adminpage';
import Bookdetails from './pages/landingpage/bookdetails';
import AdminAddBook from './pages/landingpage/addbook';


const AppRoutes: React.FC = () => {
  return (
      // <AppProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/adminlanding" element={<AdminLandingPage/>} />
      <Route path="/books/:bookid" element={<Bookdetails/>} />
      <Route path="/admin/addbook" element={<AdminAddBook/>} />
    </Routes>
      // </AppProvider>

  );
};

export default AppRoutes;
