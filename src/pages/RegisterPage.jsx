import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Registrarse</h2>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage