import React, { useEffect, useState } from 'react';

const User = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    const asyncDates = async () => {
      try {

        const emailUrl = 'https://formulario-venta-de-entradas-production.up.railway.app/get-email';

        const response = await fetch(emailUrl)
  

        console.log(response);

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();

        console.log(data)

        setEmail(data.email);
        setTelephone(data.telefono);
        setUsername(data.nombre);

      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    asyncDates();

  }, []);

  return (
    <div className="flex flex-col w-full mx-auto max-w-lg h-screen justify-center items-center">
      <ul className="space-y-4 text-lg bg-purple-700 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Bienvenido {username ? username : 'Invitado'}
        </h1>
        <li className="flex items-center space-x-2">
          <span className="font-medium">Email:</span>
          <a className="text-purple-200">
            {email ? email : 'Usuario'}
          </a>
        </li>
        <li className="flex items-center space-x-2">
          <span className="font-medium">Teléfono:</span>
          <a className="text-purple-200">
            {telephone ? telephone : 'N/A'}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default User;
