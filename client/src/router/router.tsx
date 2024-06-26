import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import Table from '../pages/AcceptingSystem/hod';
import SignupPage from '../pages/AcceptingSystem/signupPage';
import DEAN from '../pages/AcceptingSystem/dean';
import SignupPageLect from '../pages/AcceptingSystem/guest-lecturesignup';
import Registrar from '../pages/AcceptingSystem/Registar';
import ViceChancellor from '../pages/AcceptingSystem/vicechancellor';
import VpHr from '../pages/AcceptingSystem/vpHr';
import Prochancellor from '../pages/AcceptingSystem/prochancellor';
import CFO from '../pages/AcceptingSystem/cfo';
import FinancialDetailsPage from '../pages/PaymentSystem/guest-lec';
import GuestDash from '../pages/PaymentSystem/guest-lecdashboard';
import PaymentRequest from '../pages/PaymentSystem/Payment';
import HodPaymentRequest from '../pages/PaymentSystem/hod';
import UpdatePasswordPage from '../pages/updatepwd';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-6xl font-bold">Error 404: Page not found</h1>
    </div>
  );
};

const AppRouter: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="/hod" element={authenticated ? <Table/> : <LoginPage />} />
        <Route path="/dean" element={authenticated ? <DEAN/> : <LoginPage />} />
        <Route path="/registar" element={authenticated ? <Registrar/> : <LoginPage />} />
        <Route path="/vicechancellor" element={authenticated ? <ViceChancellor/> : <LoginPage />} />
        <Route path="/vphr" element={authenticated ? <VpHr/> : <LoginPage />} />
        <Route path="/prochancellor" element={authenticated ? <Prochancellor/> : <LoginPage />} />
        <Route path="/cfo" element={authenticated ? <CFO/> : <LoginPage />} />
        <Route path='/add-lecture' element={<SignupPageLect />} />
        <Route path='/finance' element={authenticated ? <FinancialDetailsPage/> : <LoginPage />} />
        <Route path='/dashboard' element={authenticated ? <GuestDash/> : <LoginPage />} />
        <Route path='/Payment' element={authenticated ? <PaymentRequest/> : <LoginPage />} />
        <Route path='/hodPayment' element={authenticated ? <HodPaymentRequest/> : <LoginPage />} />
        <Route path="/update" element={<UpdatePasswordPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
