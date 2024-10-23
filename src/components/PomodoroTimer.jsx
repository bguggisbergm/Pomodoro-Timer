import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css'; 
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para manejar la redirección

const PomodoroTimer = ({ handleLogout }) => {
  // Estado para el temporizador de trabajo y descanso
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Inicializa el temporizador de trabajo (25 minutos en segundos)
  const [breakTime, setBreakTime] = useState(5 * 60); // Inicializa el temporizador de descanso (5 minutos en segundos)
  const [isWork, setIsWork] = useState(true); // Indica si estamos en modo trabajo (true) o descanso (false)
  const [isRunning, setIsRunning] = useState(false); // Indica si el temporizador está en marcha

  // Hook para manejar el temporizador, actualiza el tiempo restante cada segundo cuando está corriendo
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      // Si está en modo trabajo, disminuye el tiempo de trabajo, de lo contrario, disminuye el tiempo de descanso
      timer = setInterval(() => {
        if (isWork) {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Reduce el tiempo de trabajo cada segundo
        } else {
          setBreakTime((prev) => (prev > 0 ? prev - 1 : 0)); // Reduce el tiempo de descanso cada segundo
        }
      }, 1000); // Intervalo de 1 segundo
    }
    return () => clearInterval(timer); // Limpia el temporizador cuando se detiene o cambia el estado
  }, [isRunning, isWork]); // Se ejecuta cuando cambia isRunning o isWork

  // Función para formatear el tiempo en minutos y segundos (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // Asegura que los segundos tengan dos dígitos
  };

  // Función para iniciar el temporizador
  const handleStart = () => setIsRunning(true);

  // Función para reiniciar el temporizador
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60); // Reinicia el tiempo de trabajo
    setBreakTime(5 * 60); // Reinicia el tiempo de descanso
    setIsWork(true); // Vuelve al modo de trabajo
  };

  // Función para alternar entre el modo de trabajo y el modo de descanso
  const toggleMode = () => setIsWork(!isWork);

  return (
    <div className="pomodoro-container">
      {/* Temporizador de trabajo */}
      <div className={isWork ? "timer work-timer active" : "timer work-timer inactive"}>
        <img src="/assets/images/workImage.png" alt="Work Timer" className="timer-image" />
        <h1>Tiempo de Trabajo</h1>
        <div className="time-display">{formatTime(timeLeft)}</div> {/* Muestra el tiempo formateado */}
      </div>

      {/* Temporizador de descanso */}
      <div className={!isWork ? "timer break-timer active" : "timer break-timer inactive"}>
        <img src="/assets/images/relaxImage.png" alt="Break Timer" className="timer-image" />
        <h1>Tiempo de Descanso</h1>
        <div className="time-display">{formatTime(breakTime)}</div> {/* Muestra el tiempo de descanso */}
      </div>

      {/* Botones de control */}
      <button className="start-button" onClick={handleStart}>Start</button> {/* Inicia el temporizador */}
      <button className="reset-button" onClick={handleReset}>Reset</button> {/* Reinicia el temporizador */}
      <button className="toggle-button" onClick={toggleMode}>
        {isWork ? 'Switch to Break' : 'Switch to Work'} {/* Alterna entre trabajo y descanso */}
      </button>

      {/* Botón para cerrar sesión */}
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default PomodoroTimer;