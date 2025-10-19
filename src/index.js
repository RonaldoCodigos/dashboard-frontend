import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Container, Typography } from '@mui/material';

// 1. DEFINA O TEMA PRIMEIRO
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Um tom de azul profissional
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f6f8', // Um cinza bem claro para o fundo
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

// 2. PEGUE O "ROOT" DA PÁGINA
const root = ReactDOM.createRoot(document.getElementById('root'));

// 3. RENDERIZE O APP, AGORA O "theme" JÁ EXISTE
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <AppBar position="static" style={{ marginBottom: '24px' }}>
        <Container maxWidth="md">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: '16px 0' }}>
            Ronaldo Brazier - Dashboard Financeiro
          </Typography>
        </Container>
      </AppBar>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();