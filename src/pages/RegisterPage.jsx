import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-emerald-400 to-cyan-400">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full m-2">
            <h2 className="text-2xl font-semibold text-center mb-6">Registrarse</h2>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage