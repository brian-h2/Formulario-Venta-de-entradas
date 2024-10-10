import React from 'react'

const User = () => {

    const username = localStorage.getItem('username');

  return (
    <div>
        <h1>{username ? `Bienvenido, ${username}!` : '¡Bienvenido! Inicia sesión para ver tu nombre.'}</h1>
    </div>
    
  )
}

export default User