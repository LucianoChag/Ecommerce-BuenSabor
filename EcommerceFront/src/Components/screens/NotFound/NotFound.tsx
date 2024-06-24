import React from 'react';
import {useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Grid } from '@mui/material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid item>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="body1" gutterBottom>
            La página que buscas no existe.
          </Typography>
          <Button variant="contained" onClick={handleNavigateHome}>
            Volver al inicio
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
};

export default NotFound;
