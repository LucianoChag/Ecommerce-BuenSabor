// src/components/VerPromociones/VerPromociones.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import PromocionCard from '../../ui/Cards/Promocion/PromocionCard'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import SucursalService from '../../../service/SucursalService';
import Promocion from '../../../types/Promocion';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const VerPromociones: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [promociones, setPromociones] = useState<Promocion[]>([]);

    const sucursalService = new SucursalService();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPromociones = async () => {
            try {
                const fetchedSucursal = await sucursalService.get(`${url}/api/sucursales`, parseInt(id!));
                const promocionesAnidadas = fetchedSucursal.domicilio?.sucursal?.promociones;
                if (Array.isArray(promocionesAnidadas)) {
                    setPromociones(promocionesAnidadas);
                }
            } catch (error) {
                console.error('Error al obtener las promociones:', error);
            }
        };

        fetchPromociones();
    }, [id, sucursalService, url]);

    const handleAddToCart = (promocion: Promocion) => {
        console.log(`Added to cart: ${promocion.descripcionDescuento}`);
    };

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
            <Typography variant="h4" sx={{ my: 2, color: '#001F3F', fontFamily: 'Jersey 15', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Promociones
            </Typography>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {promociones.map(promocion => (
                    <Grid item key={promocion.id} xs={12} sm={6} md={4}>
                        <PromocionCard promocion={promocion} onAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
            <Link to={`/sucursal/${id}/home`} style={{marginTop:'20px',  display: 'flex', justifyContent: 'left', alignItems: 'left' , textDecoration: 'none', color: 'inherit' }} >
                <Button sx={{ backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' },width:'10%'}} size="small">Volver</Button>
            </Link>
        </Container>

    );

};

export default VerPromociones;
