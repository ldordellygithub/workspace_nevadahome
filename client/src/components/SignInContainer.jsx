// src/components/Auth/SignInContainer.jsx

import React from 'react';
import SignInForm from '../components/features/Auth/SignInForm.jsx';
import  "../components/assets/styles/formStyles.css"

const SignInContainer = () => {
  return (
    <div className="sign-in-container">
      <h2>Welcome Back  User</h2>
      <div  className="text-center">
      <p>Sign in to continue your journey with us!</p>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInContainer;
