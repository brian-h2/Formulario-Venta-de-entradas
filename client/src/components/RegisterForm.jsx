import React, { useEffect,useState } from 'react'
import InputField from './InputField'
import zodConfirmation from '../utilities/schems/zod'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import axios from 'axios'


const RegisterForm = () => {

  const [formData, setFormData] = useState({
    name:'',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [loginTrigger, setLoginTrigger] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.password != formData.confirmPassword) {
      alert('Las contraseas no coinciden')
      setLoginTrigger(false);
      return
    }
    let validation = zodConfirmation(formData)
    if(validation.success) {
      alert('Registro exitoso')
      setLoginTrigger(true);
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

  useEffect(() => {
    const conexionApi = async () => {
      if (loginTrigger === true) {
        try {
          const res = await axios.post('http://localhost:5000/register', {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            username: formData.username,
          });
          setMessage(res.data);
          alert(message)// Imprime la respuesta directamente
        } catch (error) {
          alert(error); // Muestra el error completo para depuración
          setMessage(error.response ? error.response.data : "Error de conexión");
        }
      }
      setLoginTrigger(false);
    };
  
    conexionApi();
  }, [loginTrigger, formData]);
  
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
      <button type="submit" className="transition-all duration-300 ease-in-out flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg py-1.5 text-lg font-medium leading-6 text-white shadow-sm hover:bg-violet-600  hover:duration-150">Registarse</button>
      <button className="transition-all duration-300 ease-in-out flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg py-1.5 text-lg font-medium leading-6 text-white shadow-sm hover:bg-violet-600  hover:duration-150"> 
        <Link to='/' className="w-full h-full flex justify-center items-center">
          Iniciar Sesion
        </Link>
      </button>
    </form>
  )
}

export default RegisterForm