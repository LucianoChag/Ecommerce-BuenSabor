import React, { useState } from 'react';
import { IconButton, Badge, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartInstrumento from '../../../../types/CartInstrumento';
import useCartLogic from '../../../../utils/useCartLogic';

const Carrito: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartLogic();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleCartClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const totalItems = cart.reduce((total:number, item: CartInstrumento) => total + item.quantity, 0);

  return (
    <div>
      <IconButton aria-label="Carrito de Compras" color="inherit" onClick={handleCartClick}>
        <Badge badgeContent={totalItems} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 300, padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            Carrito de Compras
          </Typography>
          <List>
            {cart.length === 0 ? (
              <ListItem>
                <ListItemText primary="El carrito está vacío" />
              </ListItem>
            ) : (
              cart.map((item: CartInstrumento) => (
                <ListItem key={item.id}>
                  <ListItemText primary={`${item.instrumento} - $${item.precio}`} secondary={`Cantidad: ${item.quantity}`} />
                  <ListItemSecondaryAction>
                    <Button onClick={() => removeFromCart(item.id)}>-</Button>
                    <Button onClick={() => addToCart(item.id, cart)}>+</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
          {cart.length > 0 && (
            <div>
              <Button variant="contained" color="primary" onClick={clearCart}>
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Carrito;
