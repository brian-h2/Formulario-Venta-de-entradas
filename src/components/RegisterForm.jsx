import React, { useState } from 'react'
import InputField from './InputField'

const RegisterForm = () => {

  const [formData, setFormData] = useState({
    name:'',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }



  return (
      <form onSubmit={handleSubmit} className='space-y-4 h-full'>
        <InputField
          img = '/register/user.svg'
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeHolder="Nombre"
        />
        <InputField
          img = '/register/username.svg'
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeHolder="Usuario"
        />
        <InputField
          img = '/register/email.svg'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeHolder="Correo electrónico"
        />
        <InputField
          img = '/register/password.svg'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeHolder="Contraseña"
        />
        <InputField
          img = '/register/password.svg'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeHolder="Confirmar Contraseña"
        />
      <button type="submit" className="flex w-full max-w-64 mt-[10px] mx-auto justify-center border-2 border-[#B32E71] rounded-lg px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm">Registarse</button>
    </form>
  )
}

export default RegisterForm