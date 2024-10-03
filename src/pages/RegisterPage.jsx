import React from 'react'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2B0A52] via-[#6A0B67] to-[#B32E71] flex items-center justify-center ">
        <div className="bg-[#B32E71]/150 shadow-xl border-[1px]  border-pink-500 rounded-lg p-8 max-w-sm max-h-xl w-full m-2">
            <img src="../../register/logo.png" alt="logo" className="w-100 mb-[-100px] mt-[-120px]"/>
            <h2 className="text-[30px] text-white  font-semibold text-center mb-10">Registrarse</h2>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default RegisterPage