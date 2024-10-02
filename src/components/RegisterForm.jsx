import React, { useState } from 'react'
import InputField from './InputField'
import img from '../assets/user.svg'

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
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          img = {img}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeHolder="Nombre"
        />
        <InputField

          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeHolder="Usuario"
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeHolder="Correo electrónico"
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeHolder="Contraseña"
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeHolder="Confirmar Contraseña"
        />
    <button type="submit" class="flex w-full justify-center rounded-lg bg-green-ligth px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm">Registarse</button>
    </form>
  )
}

export default RegisterForm