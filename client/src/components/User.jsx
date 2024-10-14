import React, { useEffect, useState } from 'react';

const User = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Extraer el email de los parámetros de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const emailFromUrl = queryParams.get('email');

    if (emailFromUrl) {
      setEmail(emailFromUrl);
    } else {
      console.error('Email no encontrado en la URL');
    }
  }, []);

  return (
    <div>
      <h1>Bienvenido, {email ? email : 'Invitado'}</h1>
    </div>
  );
}

export default User;
