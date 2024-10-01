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
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
        <InputField
        label="Nombre usuario"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeHolder="Nombre usuario"
        />
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
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
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
    <button type="submit" class="btn btn-primary">Registarse</button>
    </form>
  )
}

export default RegisterForm