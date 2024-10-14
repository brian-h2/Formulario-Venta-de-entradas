import React, { useEffect, useState } from 'react';

const User = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      // Obtener el email almacenado
      const email = localStorage.getItem('username'); // O de donde estés almacenando el email
      
      if (email) {
        try {
          const response = await fetch(`https://formulario-venta-de-entradas-production.up.railway.app/get-email?email=${encodeURIComponent(email)}`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username || 'Invitado'); // Asegúrate de que la respuesta contenga el nombre
          } else {
            console.error('Error al obtener el nombre de usuario');
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      } else {
        setUsername('Invitado'); // Si no hay email almacenado
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
