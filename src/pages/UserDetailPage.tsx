// src/pages/UserDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import UserDetailComponent from '../components/UserDetailComponent';
import { User } from '../types'; // Importar la interfaz desde types.ts

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`https://aze9bicwjf.execute-api.us-east-1.amazonaws.com/dev/user/${id}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Error al obtener detalles del usuario');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={80} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">Usuario no encontrado</Typography>
            </Box>
        );
    }

    const qrUrl = `https://unicv.cl/user/${id}`;

    return (
        <Box
            sx={{
                width: '100%',
                px: { xs: 0, sm: 4 },
                mx: 'auto',
            }}
        >
            <UserDetailComponent user={user} qrUrl={qrUrl} />
        </Box>
    );
}
