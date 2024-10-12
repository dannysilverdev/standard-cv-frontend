import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, CircularProgress, Snackbar, Alert, Typography } from '@mui/material';
import UserListComponent from '../components/UserListComponent';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get<User[]>('https://y97r7zl8m2.execute-api.us-east-1.amazonaws.com/dev/users')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Error al obtener usuarios');
                setLoading(false);
            });
    }, []);

    const handleDelete = (userId: string) => {
        const idToDelete = userId.replace('USER#', '');
        axios
            .delete(`https://y97r7zl8m2.execute-api.us-east-1.amazonaws.com/dev/user/${idToDelete}`)
            .then(() => {
                setUsers(users.filter((user) => user.PK !== userId));
                setSnackbarMessage('Usuario eliminado exitosamente');
                setSnackbarOpen(true);
            })
            .catch((error) => {
                console.error('Error al eliminar usuario:', error);
                setSnackbarMessage('Error al eliminar usuario');
                setSnackbarOpen(true);
            });
    };

    const handleDetail = (userId: string) => {
        navigate(`/user/${userId}`);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Container>
                <Typography variant="h5" align="center" gutterBottom>
                    Cargando usuarios...
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Lista de Usuarios
            </Typography>
            <UserListComponent users={users} handleDelete={handleDelete} handleDetail={handleDetail} />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('eliminado') ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UserListPage;
