import React, { useState } from 'react';
import LoginForm from '../components/common/LoginForm';

function Login() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Iniciar Sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;