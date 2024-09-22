import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importa Axios
import LoadingSpinner from './components/LoadingSpinner'; // Importa el componente del spinner

function App() {
  const [users, setUsers] = useState([]);  // Estado para almacenar la lista de usuarios
  const [loading, setLoading] = useState(true);  // Estado para manejar el cargando
  const [error, setError] = useState(null);  // Estado para manejar errores

  useEffect(() => {
    console.log('Realizando solicitud a la API con Axios');
    
    axios.get('https://0e0najaond.execute-api.us-east-1.amazonaws.com/dev/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000  // Tiempo máximo de espera de 5 segundos
    })
    .then(response => {
      console.log('Usuarios obtenidos:', response.data);
      setUsers(response.data);  // Guardamos los usuarios obtenidos en el estado
      setLoading(false);  // Terminamos la carga
    })
    .catch(error => {
      console.error('Error en la solicitud:', error.message);
      setError(error.message);  // Guardamos el mensaje de error en el estado
      setLoading(false);  // Terminamos la carga aunque haya error
    });
  }, []);  // Este efecto se ejecuta solo una vez cuando el componente se monta

  // Si está cargando, mostrar mensaje de carga
  if (loading) {
    // Mostrar el spinner mientras los datos se están cargando
    return <LoadingSpinner />;
  }

  // Si hay un error, mostrar el mensaje de error
  if (error) {
    return <p>Error al cargar usuarios: {error}</p>;
  }

  // Si hay usuarios, mostrarlos en una lista
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Lista de Usuarios</h1>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-700 mb-2">Email: {user.email}</p>
              <p className="text-gray-600">Teléfono: {user.phone}</p>
              <a
                href={user.links.linkedin}
                className="text-blue-500 mt-4 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
