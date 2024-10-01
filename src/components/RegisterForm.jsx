import React, { useState } from 'react'
import InputField from './InputField'
const RegisterForm = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
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
      label="Nombre usuario"
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeHolder="Nombre usuario"
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
       <InputField
        label="Correo Electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
      />

    <button type="submit" className="btn ">Registarse</button>
    </form>
  )
}

export default RegisterForm