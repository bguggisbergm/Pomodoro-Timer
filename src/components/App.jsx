import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa los componentes de navegación de react-router-dom
import Login from './Login'; // Componente de login
import PomodoroTimer from './PomodoroTimer'; // Componente del temporizador Pomodoro

// Función para decodificar manualmente el token JWT
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Toma la segunda parte del token (payload)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convierte a base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); // Convierte el payload a un formato legible
        })
        .join('')
    );
    return JSON.parse(jsonPayload); // Retorna el objeto JSON con la información del payload
  } catch (error) {
    console.error('Error al decodificar el token:', error); // Maneja errores de decodificación
    return null;
  }
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Estado para manejar el token
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado

  // Hook useEffect para manejar la autenticación cada vez que el token cambie
  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        try {
          const decodedToken = decodeJWT(token); // Decodifica el token JWT
          const currentTime = Date.now() / 1000; // Tiempo actual en segundos

          if (decodedToken && decodedToken.exp < currentTime) {
            // Si el token ha expirado, remueve el token y deshabilita la autenticación
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          } else {
            // Si el token es válido, habilita la autenticación
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error decodificando el token:', error);
          setIsAuthenticated(false);
        }
      }
    };

    decodeToken(); // Llama a la función para verificar el token
  }, [token]); // El efecto se ejecuta cada vez que cambia el token

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remueve el token del almacenamiento local
    setToken(null); // Limpia el token del estado
    setIsAuthenticated(false); // Establece el estado de autenticación como falso
  };

  return (
    <Router> {/* El Router debe envolver las rutas para que useNavigate funcione correctamente */}
      <Routes>
        {/* Ruta para el login, redirige a /pomodoro si ya está autenticado */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login setToken={setToken} /> : <Navigate to="/pomodoro" />}
        />
        {/* Ruta para el temporizador, redirige a /login si no está autenticado */}
        <Route
          path="/pomodoro"
          element={isAuthenticated ? <PomodoroTimer handleLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        {/* Ruta por defecto que redirige a /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;