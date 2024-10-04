import React, { useState } from 'react'
import InputField from './InputField'
import zodConfirmation from '../utilities/schems/zod'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


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
    if(formData.password != formData.confirmPassword) {
      alert('Las contraseas no coinciden')
      return
    }
    let validation = zodConfirmation(formData)
    if(validation.success) {
      alert('Registro exitoso')
      localStorage.setItem('Usuario', formData)
      setFormData({
        name:'',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } else {
        validation.error.errors.forEach(err => {
            Swal.fire({
              title: 'Error!',
              text: err.message,
              color: "#2B0A52",
              position: 'top',
              timer: 2500,
              timerProgressBar: true,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: "#2B0A52",
              background: 'white',
              width: '20rem',
            })

      })
    }
  }

  return (
      <form onSubmit={handleSubmit} className='space-y-4 mb-10 h-full'>
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
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeHolder="Confirmar Contraseña"
        />
      <button type="submit" className="flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm">Registarse</button>
      <button type="submit" className="flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm"> 
        <Link to='/'>Iniciar Sesion</Link>
      </button>
    </form>
  )
}

export default RegisterForm