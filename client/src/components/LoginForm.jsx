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
    
    const redirectToGoogleSites = () => {
      const email = localStorage.getItem('username'); // Obtiene el email del localStorage
      if (email) {
        // Pasa el email a Google Sites en la URL
        const googleSitesUrl = `https://sites.google.com/view/qrentradadigital/perfil?authuser=0&email=${encodeURIComponent(email)}`;
        location.href = googleSitesUrl; // Redirige a Google Sites con el email en la URL
      } else {
        alert("No se encontró el email del usuario.");
      }
    };
    


  useEffect(() => {
    const conexionApi = async () => {
      if(loginTrigger == true) {
        try {
          const res = await axios.post('https://formulario-venta-de-entradas-production.up.railway.app', {
            email: loginData.email,
            password: loginData.password,
          });
          localStorage.setItem('username', loginData.email);
          alert(res.data)
          redirectToGoogleSites()
          // location.href = 'https://sites.google.com/view/qrentradadigital/'
        } catch (error) {
          alert(error);
        }
      }
      setLoginTrigger(false);
    }
    conexionApi();
  }, [loginTrigger,loginData]);


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