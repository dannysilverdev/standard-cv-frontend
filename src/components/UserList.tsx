import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<User[]>('https://olvaeqska4.execute-api.us-east-1.amazonaws.com/dev/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error); // Loguea el error si lo necesitas
                setError('Error al obtener usuarios');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} - {user.phone}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
