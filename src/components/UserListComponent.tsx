import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Ícono de papelera
import InfoIcon from '@mui/icons-material/Info'; // Ícono de información
import { User } from '../types'; // Asegúrate de que esta ruta sea correcta

interface UserListComponentProps {
    users: User[];
    handleDelete: (userId: string) => void;
    handleDetail: (userId: string) => void;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ users, handleDelete, handleDetail }) => {
    if (!users || users.length === 0) {
        return (
            <Typography variant="h6" align="center">
                No hay usuarios disponibles.
            </Typography>
        );
    }

    // Función para quitar el prefijo "USER#"
    const cleanUserId = (userId: string) => {
        return userId.replace('USER#', ''); // Eliminar el prefijo "USER#"
    };

    return (
        <List>
            {users.map((user) => (
                <ListItem key={user.PK} divider>
                    {/* Contenido del usuario */}
                    <ListItemText
                        primary={user.name}
                        secondary={
                            <>
                                <span>Email: {user.email}</span>
                                <br />
                                <span>Teléfono: {user.phone}</span>
                                <br />
                                <span>Ubicación: {user.location}</span>
                                {/* Verificar si tiene LinkedIn */}
                                {user.links?.linkedin && (
                                    <>
                                        <br />
                                        <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer">
                                            LinkedIn
                                        </a>
                                    </>
                                )}
                            </>
                        }
                    />

                    {/* Botón de eliminar */}
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton
                            edge="end"
                            color="error"
                            onClick={() => handleDelete(user.PK)}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>

                        {/* Botón de detalles */}
                        <IconButton
                            edge="end"
                            color="primary"
                            onClick={() => handleDetail(cleanUserId(user.PK))} // Limpiar el "USER#" antes de pasar el id
                            aria-label="details"
                        >
                            <InfoIcon />
                        </IconButton>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default UserListComponent;
