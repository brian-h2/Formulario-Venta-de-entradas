import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserPage = () => {
  const [username, setUsername] = useState('');
  const location = useLocation();

  // Extraer el email de la URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  const fetchUsername = async () => {
    try {
      // Asegúrate de incluir el email en tu solicitud si es necesario
      const response = await fetch(`https://formulario-venta-de-entradas.vercel.app/user?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Error al obtener el nombre de usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUsername();
    }
  }, [email]);

  return (
    <div>
      <h1>Bienvenido, {username}</h1>
    </div>
  );
};

export default UserPage;
