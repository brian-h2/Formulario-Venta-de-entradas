import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-teal-100 to-yellow-100 flex items-center justify-center">
        <div className="bg-[#E7F2EC]/50 shadow-lg rounded-lg p-8 max-w-sm w-full m-2">
            <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage