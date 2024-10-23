import React, { useState } from 'react';
import './Login.css'; // Archivo CSS para los estilos del formulario de login

const Login = ({ setToken }) => {
  // Estado para el nombre de usuario, la contraseña y el mensaje de error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Maneja el proceso de login cuando el usuario envía el formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    try {
      // Envía una solicitud POST al servidor para hacer login
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Envía los datos del usuario
      });

      const data = await response.json();
      if (response.ok) {
        // Si la respuesta es exitosa, guarda el token
        setToken(data.token);
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
      } else {
        // Si la respuesta no es exitosa, muestra un mensaje de error
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      // Muestra un error si hay problemas con la conexión al servidor
      console.error('Error al conectar con el servidor:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {/* Formulario de login */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del nombre de usuario
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;