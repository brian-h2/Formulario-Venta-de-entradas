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
                title: 'Error en el login',
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
    
    const redirectToGoogleSites = (email, token) => {
      if (email && token) {
        const googleSitesUrl = `https://sites.google.com/view/qrentradadigital/carrito/mis-entradas/?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
        window.location.href = googleSitesUrl;  // Redirige al usuario
      } else {
        console.error('Email o token no están definidos:', { email, token });
      }
      
    };

    const errorAlert = (errorMessage) => {
      Swal.fire({
        title: 'Error',
        text: errorMessage,
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
    }
  
    

    useEffect(() => {
      const conexionApi = async () => {
        if (loginTrigger) {
          try {
            // Hacer la solicitud de inicio de sesión
            const res = await axios.post(
              'https://formulario-venta-de-entradas-production.up.railway.app', 
              {
                email: loginData.email,
                password: loginData.password,
              }, 
              {
                withCredentials: true,  // Permite que las cookies se manejen
                headers: {
                  'Content-Type': 'application/json',  // Asegura que envíes JSON
                },
              }
            );
    
            console.log(res);
    
            // Hacer la solicitud para guardar el email
            await axios.post('https://formulario-venta-de-entradas-production.up.railway.app/save-email', {
              email: loginData.email,
            });
    
            // Mostrar el Toast de éxito
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
    
            Toast.fire({
              icon: "success",
              title: "Inicio de sesión exitoso"
            });
    
            // Redirigir después de que el Toast se cierre
            setTimeout(() => {
              redirectToGoogleSites(loginData.email, res.data.token);
            }, 3000);  // Espera a que el Toast se cierre antes de redirigir
    
          } catch (error) {
            // Manejo de errores
            if (error.response) {
              errorAlert(error.response);
            } else if (error.request) {
              errorAlert(error.request);
            } else {
              errorAlert(error.message);
            }
          } finally {
            setLoginTrigger(false);  // Se ejecuta siempre, incluso si hubo un error
          }
        }
      };
    
      conexionApi();
    }, [loginTrigger, loginData]);
  
    
  


  return (
    <form action="/" className='space-y-4 mb-5 h-full' method="POST">
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