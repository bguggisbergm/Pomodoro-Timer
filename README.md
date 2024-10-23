Pomodoro Timer Web App
Descripción del Proyecto
Esta aplicación es un temporizador Pomodoro que ayuda a gestionar tiempos de trabajo y descanso. Está desarrollada en React y utiliza MongoDB para la autenticación de usuarios mediante JWT (JSON Web Token). El propósito de esta aplicación es mejorar la productividad utilizando la técnica Pomodoro, que consiste en trabajar durante 25 minutos y luego tomar un descanso de 5 minutos. El usuario debe iniciar sesión para acceder a la funcionalidad del temporizador.

Características principales:
Autenticación de usuario: El usuario debe registrarse y/o iniciar sesión para utilizar el temporizador.
Temporizador Pomodoro: Temporizador para ciclos de trabajo (25 minutos) y descanso (5 minutos).
Logout: El usuario puede cerrar sesión y será redirigido a la página de login.
Tecnologías Utilizadas
React (Frontend)
React Router (Gestión de rutas)
Vite (Herramienta de desarrollo)
Express.js (Backend para la autenticación)
MongoDB (Base de datos)
JWT (Autenticación de usuarios)
CSS (Estilos)

// Carpeta POSTMAN - Muestra el funcionamiento de login de usuario (registro-login-ingreso) y postman collection para pruebas
// Carpeta MOCKUPS - Muestra la visualización de la web en funcionamiento

Pre-requisitos
Antes de levantar el proyecto en tu máquina local, asegúrate de tener instalados los siguientes componentes:

Node.js (versión 14 o superior)
NPM (gestor de paquetes de Node.js)
MongoDB (Puedes usar MongoDB Atlas o instalar MongoDB localmente)
Variables de Entorno
Deberás crear un archivo .env en el directorio raíz de tu proyecto con las siguientes variables:

MONGODB_URI=<URI_de_tu_Base_de_Datos_MongoDB>
PORT=3000
JWT_SECRET=<Tu_Secreto_JWT>

Instalación
Sigue los siguientes pasos para clonar y configurar el proyecto en tu máquina local.

1-Clonar el repositorio:
git clone https://github.com/bguggisbergm/Pomodoro-Timer.git
cd pomodoro-timer

2-Instalar dependencias del servidor (backend):

En la carpeta raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias del servidor.
npm install

3-Instalar dependencias del cliente (frontend):

Luego, navega a la carpeta del frontend y ejecuta el comando para instalar las dependencias de la aplicación React.
cd frontend
npm install

Levantar el Proyecto Localmente
Una vez instaladas las dependencias, sigue estos pasos para levantar tanto el servidor como el cliente.

1. Levantar el Backend (Servidor Express):
En la carpeta raíz del proyecto, ejecuta el siguiente comando:

npm run server

Esto levantará el servidor en el puerto que hayas definido en el archivo .env (por defecto, el puerto 3000).

2. Levantar el Frontend (React con Vite):
Navega a la carpeta frontend y ejecuta el siguiente comando:

npm run dev

Esto levantará la aplicación React en http://localhost:5173.

3. Acceso a la aplicación
Abre tu navegador y accede a http://localhost:5173.
Verás la pantalla de login. Si no tienes un usuario, primero regístrate usando la API de registro.
Uso del Proyecto
Registro de Usuario
Puedes crear un nuevo usuario enviando una solicitud POST a la API del servidor.

Endpoint: POST /register

Body (JSON):

{
  "username": "nuevo_usuario",
  "password": "nueva_contraseña"
}

Iniciar Sesión
Después de crear un usuario, puedes iniciar sesión directamente desde la aplicación web. Introduce tu nombre de usuario y contraseña en el formulario de login.

Temporizador Pomodoro
Una vez que hayas iniciado sesión, serás redirigido a la página del temporizador Pomodoro. Aquí podrás:

Iniciar el temporizador de trabajo.
Cambiar entre los modos de trabajo y descanso.
Resetear el temporizador en cualquier momento.
Cerrar sesión cuando hayas terminado, lo que te llevará de nuevo a la página de login.
Dependencias
Este proyecto utiliza las siguientes dependencias:

Backend:

express
mongoose
jwt
bcryptjs
cors
body-parser
Frontend:

react
react-router-dom
vite
Consideraciones Adicionales
Asegúrate de que tu servidor de MongoDB esté corriendo y que la URI en el archivo .env sea correcta.
Si estás utilizando MongoDB Atlas, asegúrate de que las IPs correctas están habilitadas en las configuraciones de red de tu clúster.
Contribuir
Si quieres contribuir a este proyecto, siéntete libre de hacer un fork, enviar un pull request o abrir un issue.