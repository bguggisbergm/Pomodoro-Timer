import { StrictMode } from 'react'; // StrictMode se usa para identificar errores potenciales en la aplicación
import { createRoot } from 'react-dom/client'; // API de React para crear un contenedor raíz
import App from './components/App.jsx'; // Importa el componente principal App
import './index.css'; // Archivo CSS principal de la aplicación

// Renderiza la aplicación dentro del contenedor raíz con StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
