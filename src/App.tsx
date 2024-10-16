import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, IconButton, Container, Box, Tooltip, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import theme from './theme';
import CreateUserForm from './components/CreateUserForm';
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';
import Login from './components/Login';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            UNICV
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, justifyContent: 'flex-end' }}>
            <Tooltip title="Inicio">
              <IconButton color="inherit" component={Link} to="/" size="large" sx={{ color: 'black' }}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Currículums">
              <IconButton color="inherit" component={Link} to="/ver-usuarios" size="large" sx={{ color: 'black' }}>
                <DescriptionIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Crear Nuevo Currículum">
              <IconButton color="inherit" component={Link} to="/crear-usuario" size="large" sx={{ color: 'black' }}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Opciones de Usuario">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, color: 'black' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.700' }}>U</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
              <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

const Home: React.FC = () => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 128px)'
  }}>
    <Typography variant="h4" gutterBottom>
      Bienvenido a la aplicación de gestión de Currículums
    </Typography>
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      gap: 2,
      width: '100%',
      maxWidth: 'sm',
      mt: 2
    }}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        component={Link}
        to="/crear-usuario"
        startIcon={<AddIcon />}
      >
        Ingresar MiCV
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        component={Link}
        to="/ver-usuarios"
        startIcon={<DescriptionIcon />}
      >
        Ver CVS
      </Button>
    </Box>
  </Box>
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/crear-usuario" element={<CreateUserForm />} />
            <Route path="/ver-usuarios" element={<UserListPage />} />
            {/* Ruta para ver los detalles de un usuario */}
            <Route path="/user/:id" element={<UserDetailPage />} />
            {/* Ruta para el inicio de sesión */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;