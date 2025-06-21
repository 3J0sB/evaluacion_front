import React from 'react'
import RegisterForm from '../components/common/RegisterForm'

function Register() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Crear Cuenta</h2>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register