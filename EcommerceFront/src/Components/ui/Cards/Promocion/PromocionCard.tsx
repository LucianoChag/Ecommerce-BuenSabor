import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon, Info as InfoIcon } from '@mui/icons-material';
import Promocion from '../../../../types/Promocion';
import { useAuth } from '../../../../contexts/AuthContext';

interface PromocionCardProps {
  promocion: Promocion;
  onAddToCart: (promocion: Promocion) => void;
}

const PromocionCard: React.FC<PromocionCardProps> = ({ promocion, onAddToCart }) => {
  const { isAuthenticated, userRole } = useAuth();
  const { denominacion, descripcionDescuento, precioPromocional, imagenes } = promocion;

  const showAddToCartButton = isAuthenticated && userRole !== 'ADMIN' && userRole !== 'OPERADOR';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#e0ebc2' }}>
      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
        <img src={imagenes[0]?.url || 'default-image-url.jpg'} alt={denominacion} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ color: '#6a1b9a' }}>{denominacion}</Typography>
        <Typography variant="body2" color="textSecondary">{descripcionDescuento}</Typography>
        <Typography variant="body1" gutterBottom>Precio Promocional: ${precioPromocional}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid container spacing={1}>
          {showAddToCartButton && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => onAddToCart(promocion)}
                fullWidth
                sx={{ backgroundColor: '#7b1fa2', color: 'white', '&:hover': { backgroundColor: '#4a0072' } }}
              >
                Agregar al carrito
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Link to={`/detallesPromocion/${promocion.id}`} style={{ textDecoration: 'none', width: '100%' }}> 
              <Button
                variant="contained"
                startIcon={<InfoIcon />}
                fullWidth
                sx={{ backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' } }}
              >
                Ver detalles
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PromocionCard;
