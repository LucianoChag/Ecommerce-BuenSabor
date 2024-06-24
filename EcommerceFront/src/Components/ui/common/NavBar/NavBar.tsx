import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../../../contexts/AuthContext';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';


import { useParams } from 'react-router-dom';

const Navbar = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const handleCartClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  const isHomePage = location.pathname === '/';
  const isSucursalPage = location.pathname.startsWith('/sucursal');

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#a6c732' }}>
        <Toolbar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: '#FFFFBF', justifyContent: 'center' }}
          >
            <img src="/img/buenSabor.png" alt="Logo de Buen Sabor" style={{ width: '130px', height: '35px', marginRight: '2px' }} />
            <LunchDiningOutlinedIcon sx={{ color: '#FFFFBF', mr: 1 }} />

          </Typography>
          {isHomePage && (
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
            </Typography>
          )}

          {isSucursalPage && (
            <>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
              </Typography>


            </>
          )}

          {!isAuthenticated ? (
            <IconButton aria-label="Iniciar Sesión" onClick={handleLoginClick} color="inherit">
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <>
              <IconButton aria-label="Usuario" onClick={handleMenuClick} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 300 }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Carrito" />
            </ListItem>

          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;

