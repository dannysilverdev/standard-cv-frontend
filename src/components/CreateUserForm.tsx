import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

const CreateUserForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '' // Añadimos el campo de LinkedIn
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post('https://y97r7zl8m2.execute-api.us-east-1.amazonaws.com/dev/user', formData)
            .then((response) => {
                console.log('Usuario creado:', response.data);
                setSnackbarMessage('Usuario creado exitosamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Error al crear el usuario:', error);
                if (error.response?.data?.error === 'El usuario ya existe con este email.') {
                    setSnackbarMessage('El usuario ya existe con este email');
                } else {
                    setSnackbarMessage('Error al crear el usuario');
                }
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
            <TextField
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                label="Teléfono"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                label="Ubicación"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ubicación"  // Campo de ubicación
            />
            <TextField
                label="LinkedIn"
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Crear Usuario
            </Button>

            {/* Snackbar para notificaciones */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default CreateUserForm;
