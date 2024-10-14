import React, { useEffect, useState } from 'react';

const User = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Aquí haces la llamada a tu API o backend para obtener el nombre de usuario
    const fetchUsername = async () => {
      try {
        const response = await fetch('https://formulario-venta-de-entradas-production.up.railway.app/get-email'); 
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Asigna el nombre de usuario recibido
        } else {
          console.error('Error al obtener el nombre de usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div>
      <h1>Bienvenido, {username ? username : 'Invitado'}</h1>
    </div>
  );
}

export default User;
