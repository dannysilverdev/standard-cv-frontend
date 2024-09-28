// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos Routes y Route
import CreateUserForm from './components/CreateUserForm';
import UserList from './components/UserList'; // Importamos el componente para la lista de usuarios
//import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Simula la carga inicial, por ejemplo, datos de configuración o del usuario
    setTimeout(() => {
      setLoading(false); // Cambia el estado después de cargar
    }, 2000); // Simulación de 2 segundos de carga
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Ruta para crear nuevo usuario */}
        <Route path="/crear-usuario" element={<CreateUserForm />} />

        {/* Ruta para ver todos los usuarios */}
        <Route path="/ver-usuarios" element={<UserList />} />

        {/* Ruta por defecto, que muestra la página principal */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:flex-row sm:justify-between">
              <h1 className="text-2xl font-bold text-center sm:text-4xl">
                Bienvenido a la aplicación de gestión de usuarios
              </h1>
              <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
                <a
                  href="/crear-usuario"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded mb-2 sm:mb-0"
                >
                  Crear un nuevo usuario
                </a>
                <a
                  href="/ver-usuarios"
                  className="inline-block bg-green-500 text-white py-2 px-4 rounded"
                >
                  Ver usuarios
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );

}

export default App;

