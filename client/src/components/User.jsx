import React, { useEffect, useState } from 'react';

const User = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Aquí haces la llamada a tu API para obtener el nombre de usuario
    const fetchUsername = async () => {
      try {
        const response = await fetch('https://formulario-venta-de-entradas-production.up.railway.app/get-email'); // Cambia a la URL de tu API
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

    fetchUsername();
  }, []);

  return (
    <div>
      <h1>Bienvenido, {username ? username : 'Invitado'}</h1>
    </div>
  );
}

export default User;