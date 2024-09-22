import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importa Axios

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
    return <p>Cargando usuarios...</p>;
  }

  // Si hay un error, mostrar el mensaje de error
  if (error) {
    return <p>Error al cargar usuarios: {error}</p>;
  }

  // Si hay usuarios, mostrarlos en una lista
  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default App;
