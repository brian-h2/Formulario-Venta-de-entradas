import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token'); // Obtener el token

    // Función para obtener el email del usuario
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get('https://formulario-venta-de-entradas-production.up.railway.app/get-email', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Usa el token para autorización
            'Content-Type': 'application/json',
          },
        });

        // Suponiendo que el email está en response.data.nombre
        setUserEmail(response.data);
        console.log(userEmail)
      } catch (error) {
        console.error('Error al obtener el email:', error);
        setError('Error al cargar el usuario.');
      }
    };

    // Verifica si hay token antes de hacer la solicitud
    if (token) {
      fetchUserEmail();
    } else {
      setError('No se encontró la información de autenticación.');
    }
  }, []); // Dependencias vacías para que se ejecute solo una vez al montar

  return (
    <div id="userEmail">
      {error ? <p>{error}</p> : <p>{userEmail ? `Usuario: ${userEmail}` : 'Cargando...'}</p>}
    </div>
  );
};

export default User;
