import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',  // Forzar el modo claro
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f5f5f5',  // Fondo claro
                    color: '#000000',  // Texto oscuro
                },
                '*': {
                    colorScheme: 'light',  // Elimina cualquier detección automática de modo oscuro
                },
            },
        },
    },
});

export default theme;
