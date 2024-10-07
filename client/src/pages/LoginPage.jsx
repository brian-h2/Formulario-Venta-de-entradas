import React, {useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios';

const LoginPage = () => {

  return (
    <div className="min-h-screen overscroll-none bg-gradient-to-r from-[#2B0A52] via-[#6A0B67] to-[#B32E71] flex items-center justify-center ">
      <div className="bg-[#B32E71]/150 shadow-xl border-[1px]  border-pink-500 rounded-lg p-8 max-w-sm max-h-xl w-full m-2">
          <img src="../../register/logo.png" alt="logo" className="w-100 mb-[-100px] mt-[-120px]"/>
          <h2 className="text-[30px] text-white  font-semibold text-center mb-5">Iniciar Sesion</h2>
          <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage