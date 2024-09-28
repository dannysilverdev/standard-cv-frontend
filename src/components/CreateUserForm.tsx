import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post('https://tu-api-url/users', formData)
            .then((response) => {
                console.log('Usuario creado:', response.data);
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Teléfono"
            />
            <button type="submit">Crear Usuario</button>
        </form>
    );
};

export default CreateUserForm;
