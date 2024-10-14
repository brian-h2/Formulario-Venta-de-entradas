import React, { useEffect, useState } from 'react';

const User = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {

    const asyncDates = async () => {

      try {
      
        const emailUrl = 'https://formulario-venta-de-entradas-production.up.railway.app/get-email'
  
        const response = await fetch(emailUrl);
        const data = await response.json();
        
        setUsername(data.email);
  
  
      } catch (error) {
        alert('Error: ' + error.message)
      }

    }

    asyncDates();

  }, )

  return (
    <div>
      <h1>Bienvenido, {username ? username : 'Invitado'}</h1>
    </div>
  );
}

export default User;
