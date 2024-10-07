import { useEffect, useState } from 'react';
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

function App() {

  const [values,setValues] = useState()

  useEffect(() => {
    const conexionApi = async () => {
      try {
        const response = await fetch('http://localhost:5000');
        const data = await response;
        setValues(data);
        console.log('API Version:', data);
      } catch (error) {
        console.error('Error connecting to API:', error);
      }
    }

    conexionApi();
  
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />,
    }
  ])

  return (
    <>
      <RouterProvider 
      router={router} 
      //  fallbackElement={<BigSpinner />}/>
      />
    </>
  )
}

export default App
