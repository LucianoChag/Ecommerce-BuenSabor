import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sucursal from '../../../../types/Sucursal';

interface CardSucursalProps {
    sucursal: Sucursal;
}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/sucursal/${sucursal.id}/home`);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardMedia
                component="img"
                height="140"
                image="https://img.recraft.ai/rhhzphKzFj1fofdoUvcOw7ZPpLbW4-PBaBIFbvYOVno/rs:fit:1024:1024:0/q:80/g:no/plain/abs://prod/images/1ae55053-5a35-491a-af5d-801f1309a58d@avif"  // Imagen genérica
                alt={sucursal.nombre}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {sucursal.nombre}
                </Typography>
                <Typography key={sucursal.id} variant="body1" sx={{ mb: 1 }}>{sucursal.nombre} - {sucursal.domicilio.calle} {sucursal.domicilio.numero}, {sucursal.domicilio.localidad.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {sucursal.horarioApertura} - {sucursal.horarioCierre}
                </Typography>
            </CardContent>
            <Box textAlign="center" mb={2}>
                <Button style={{backgroundColor:'#a6c732'}} variant="contained" color="primary" onClick={handleNavigate}>
                    Ver Sucursal
                </Button>
            </Box>
        </Card>
    );
};

export default CardSucursal;
