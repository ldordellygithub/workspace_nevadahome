import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Testimonios from './components/pages/Testimonio';
import CreateAccountContainer from './components/CreateAccountContainer';
import SignInContainer  from './components/SignInContainer';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Testimonios />} />
      <Route path='/signup' element={<CreateAccountContainer />} />
      <Route path='/signIn' element={<SignInContainer />} />
      {/* <Route path='*' element={<NotFound />} /> */} 

    </Routes>
  );
}

export default AppRoutes;
