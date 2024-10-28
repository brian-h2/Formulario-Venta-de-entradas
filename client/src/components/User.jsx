import { useEffect, useState } from 'react';

const User = () => {
  
  const [user,setUser] = useState(null);

    useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://formulario-venta-de-entradas-production.up.railway.app/get-email', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviamos el token en el header
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al obtener los datos del usuario');
        }
      })
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <p>Nombre: {user.nombre}</p>
      <p>Email: {user.email}</p>
      <p>Teléfono: {user.telefono}</p>
    </div>
  );
}

export default User;
