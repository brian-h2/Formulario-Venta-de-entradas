import {useEffect,useState } from "react"
import { Link } from "react-router-dom"
import zodConfirmation from "../utilities/schems/zod"
import Swal from 'sweetalert2'
import axios from 'axios'

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const [mensaje,setMensaje] = useState('')

    const [loginTrigger, setLoginTrigger] = useState(false)


    const handleLogin = (e) => {
        e.preventDefault()
       let validation = zodConfirmation(loginData)
       if(validation.success) {
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
        setLoginTrigger(false);
      }
    }

    const handleEvent = (e) => {
        const {name,value} = e.target
        setLoginData({...loginData, [name]: value })
    }
    
    const redirectToGoogleSites = async (email) => {
      const apiUrl = `https://formulario-venta-de-entradas-production.up.railway.app/user?email=${encodeURIComponent(email)}&authuser=0`;
      const googleSitesUrl = `https://sites.google.com/view/qrentradadigital/carrito/mis-entradas?email=${encodeURIComponent(email)}&authuser=0`;
    
      try {
        // Hacer la solicitud a la API
        const response = await fetch(apiUrl);
        if (response.ok) {
          // Puedes manejar la respuesta si es necesario
          const data = await response.json();
          console.log('Respuesta de la API:', data);
        } else {
          console.error('Error al llamar a la API');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    
      // Redirigir a Google Sites después de llamar a la API
      window.location.href = googleSitesUrl;
    };
    
    

  useEffect(() => {
    const conexionApi = async () => {
      if (loginTrigger) {
        try {
          const res = await axios.post('https://formulario-venta-de-entradas-production.up.railway.app', {
            email: loginData.email,
            password: loginData.password,
          });
  
          await axios.post('https://formulario-venta-de-entradas-production.up.railway.app/save-email', {
            email: loginData.email,
          });
          localStorage.setItem('username', loginData.email);
          alert('Logueado exitosamente');
        
          redirectToGoogleSites(loginData.email);
        } catch (error) {
          if (error.response) {
            console.log('Error response:', error.response.data);
          } else if (error.request) {
            console.log('No response received:', error.request);
          } else {
            console.log('Error setting up request:', error.message);
          }
          alert('Error logging in');
        } finally {
          setLoginTrigger(false);  // Se ejecuta siempre, incluso si hubo un error
        }
      }
    };
  
    conexionApi();
  }, [loginTrigger, loginData]);
  


  return (
    <form className='space-y-4 mb-5 h-full'>
        <img src="/register/email.svg" alt="email" className='w-10 absolute pt-6 py-1 px-2' />
        <input
         className='shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          img = '/register/email.svg'  
          id='email'
          type='email'
          name='email'
          onChange={handleEvent}
          value={loginData.email}
          placeholder='Correo electrónico'
        />
        <img src="/register/password.svg" alt="password" className='w-10 absolute pt-1.5 py-1 px-2'/>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={handleEvent}
          id='password'
          type='password'
          name='password'
          value={loginData.password}
          placeholder='Contraseña'
        />
        <button type='submit' className='transition-all duration-300 ease-in-out flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg py-1.5 text-lg font-medium leading-6 text-white shadow-sm hover:bg-violet-600  hover:duration-150' onClick={handleLogin}>Ingresar</button>
        <button type='submit' className='transition-all duration-300 ease-in-out flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg py-1.5 text-lg font-medium leading-6 text-white shadow-sm hover:bg-violet-600  hover:duration-150'>
          <Link to='/register' className="w-full h-full flex justify-center items-center">
          Registrarse
          </Link>
        </button>
    </form>
  )
}

export default LoginForm