import { useEffect,useState } from "react"
import { Link } from "react-router-dom"


const LoginForm = ({router}) => {

    // console.log(router)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleEvent = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]: value })
    }


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
          value={formData.email}
          placeholder='Correo electrónico'
        />
        <img src="/register/password.svg" alt="password" className='w-10 absolute pt-1.5 py-1 px-2'/>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          onChange={handleEvent}
          id='password'
          type='password'
          name='password'
          value={formData.password}
          placeholder='Contraseña'
        />
        <button type='submit' className='flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm' onClick={handleLogin}>Ingresar</button>
        <button type='submit' className='flex w-full max-w-64 mt-[10px] h-full max-h-120 mx-auto justify-center border-2 border-[#B32E71] rounded-lg px-3 py-1.5 text-lg font-medium leading-6 text-white shadow-sm'>
          <Link to='/register'>Registrarse</Link>
        </button>
    </form>
  )
}

export default LoginForm