import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, Card, CardContent, Chip, List, ListItemText, Divider, IconButton, Modal, Collapse, useMediaQuery } from '@mui/material';
import { Email, Phone, LinkedIn, Work, School, Share, Close, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { QRCodeCanvas } from 'qrcode.react';
import theme from '../theme';
import { User } from '../types';

const skills = ['React', 'TypeScript', 'Node.js', 'AWS', 'DynamoDB'];
const experience = [
    { company: 'Gty / Banagro', position: 'Full Stack Developer', period: '2022 - 2023', description: 'Desarrollo de aplicaciones web utilizando tecnologías modernas como React, Node.js y AWS.' },
    { company: 'Spm Ingenieros / Codelco', position: 'Full Stack Developer', period: '2020 - 2022', description: 'Implementación de soluciones tecnológicas para la gestión de órdenes de trabajo y mediciones de activos.' },
];
const education = [
    { institution: 'Universidad de Aconcagua', degree: 'Ingeniería Civil Industrial', year: '2019' },
    { institution: 'Universidad de Aconcagua', degree: 'Ingeniería de ejecución informática', year: '2015' },
];

interface UserDetailComponentProps {
    user: User;
    qrUrl: string;
}

const UserDetailComponent: React.FC<UserDetailComponentProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        axios
            .get(`https://y97r7zl8m2.execute-api.us-east-1.amazonaws.com/dev/user/${id}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
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

    const qrUrl = `https://unicv.cl/user/${id}`;
    const handleExpandClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 } }}>
            <Card elevation={3} sx={{ mb: 4, width: '100%', mx: 'auto', position: 'relative' }}>
                <CardContent>
                    {user ? (
                        <Box display="flex" flexDirection="column" gap={2}>
                            {/* Botón de compartir en mobile y desktop */}
                            <IconButton
                                onClick={() => setOpenModal(true)}
                                color="primary"
                                sx={{ position: 'absolute', top: 16, right: 16, fontSize: '2rem' }}
                            >
                                <Share sx={{ fontSize: '2rem' }} />
                            </IconButton>

                            {/* Información del usuario */}
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ mt: { xs: 2, sm: 4 } }}>

                                {/* Contacto (solo en móviles, encima del nombre del usuario, en una línea, sin texto) */}
                                {isMobile && (
                                    <Box display="flex" justifyContent="center" gap={2} mb={2}>
                                        <IconButton component="a" href={`mailto:${user.email}`} color="primary">
                                            <Email fontSize="large" />
                                        </IconButton>
                                        <IconButton component="a" href={`tel:${user.phone}`} color="primary">
                                            <Phone fontSize="large" />
                                        </IconButton>
                                        {user.links?.linkedin && (
                                            <IconButton component="a" href={`https://www.linkedin.com/in/danielsilvac`} target="_blank" color="primary">
                                                <LinkedIn fontSize="large" />
                                            </IconButton>
                                        )}
                                    </Box>
                                )}

                                <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', wordWrap: 'break-word' }}>
                                    {user.name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {user.location}
                                </Typography>
                            </Box>

                            {/* Contacto (solo en versión desktop con texto) */}
                            <Box display={{ xs: 'none', sm: 'flex' }} justifyContent="center" alignItems="center" gap={2}>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconButton component="a" href={`mailto:${user.email}`} color="primary">
                                        <Email fontSize="large" />
                                    </IconButton>
                                    <Typography variant="body1">{user.email}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconButton component="a" href={`tel:${user.phone}`} color="primary">
                                        <Phone fontSize="large" />
                                    </IconButton>
                                    <Typography variant="body1">{user.phone}</Typography>
                                </Box>
                                {user.links?.linkedin && (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <IconButton component="a" href={`https://www.linkedin.com/in/danielsilvac`} target="_blank" color="primary">
                                            <LinkedIn fontSize="large" />
                                        </IconButton>
                                        <Typography variant="body1">danielsilvac</Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Experiencia */}
                            <Box>
                                <Typography variant="h6" gutterBottom>Experiencia</Typography>
                                <List>
                                    {experience.map((exp, index) => (
                                        <React.Fragment key={index}>
                                            <Box
                                                onClick={() => handleExpandClick(index)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    py: 1,
                                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                                                }}
                                            >
                                                <Box display="flex" alignItems="center">
                                                    <Work sx={{ mr: 2 }} />
                                                    <ListItemText
                                                        primary={exp.position}
                                                        secondary={`${exp.company} — ${exp.period}`}
                                                    />
                                                </Box>
                                                <ExpandMoreIcon
                                                    sx={{
                                                        transform: expandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s',
                                                    }}
                                                />
                                            </Box>
                                            <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                                                <Box sx={{ ml: 6, my: 1 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {exp.description}
                                                    </Typography>
                                                </Box>
                                            </Collapse>
                                            {index < experience.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>

                            {/* Educación */}
                            <Box>
                                <Typography variant="h6" gutterBottom>Educación</Typography>
                                <List>
                                    {education.map((edu, index) => (
                                        <React.Fragment key={index}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                                                <School sx={{ mr: 2 }} />
                                                <ListItemText primary={edu.degree} secondary={`${edu.institution} — ${edu.year}`} />
                                            </Box>
                                            {index < education.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>

                            {/* Skills */}
                            <Box>
                                <Typography variant="h6" gutterBottom>Skills</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {skills.map((skill) => (
                                        <Chip key={skill} label={skill} />
                                    ))}
                                </Box>
                            </Box>

                            {/* Modal QR */}
                            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="rgba(0,0,0,0.5)">
                                    <Box bgcolor="white" p={4} borderRadius={2} textAlign="center">
                                        <Typography variant="h5" gutterBottom>UNICV QR</Typography>
                                        <QRCodeCanvas value={qrUrl} size={300} />
                                        <Box mt={2}>
                                            <IconButton color="secondary" onClick={() => setOpenModal(false)}>
                                                <Close />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </Modal>
                        </Box>
                    ) : (
                        <Typography color="error">Usuario no encontrado</Typography>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserDetailComponent;
