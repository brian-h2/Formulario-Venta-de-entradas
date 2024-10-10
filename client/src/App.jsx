import './App.css'
import User from './components/User';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />,
    }, 
    {
      path: "/user",
      element: <User />,
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
