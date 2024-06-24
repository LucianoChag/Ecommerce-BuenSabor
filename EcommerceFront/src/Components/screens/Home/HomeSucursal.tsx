// src/components/HomeSucursal/HomeSucursal.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, IconButton, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SucursalService from '../../../service/SucursalService';
import Promocion from '../../../types/Promocion';
import Sucursal from '../../../types/Sucursal';
import LinkCard from '../../ui/Cards/LinkCard/LinkCard'; // Importamos la nueva tarjeta

const HomeSucursal: React.FC = () => {
    
    const { id } = useParams<{ id: string }>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sucursal, setSucursal] = useState<Sucursal | null>(null);
    const [promociones, setPromociones] = useState<Promocion[]>([]);
    const url = import.meta.env.VITE_API_URL;

    const sucursalService = useMemo(() => new SucursalService(), []);

    useEffect(() => {
        const fetchSucursal = async () => {
            if (id !== undefined) {
                try {
                    const fetchedSucursal = await sucursalService.get(`${url}/api/sucursales`, parseInt(id));

                    if (fetchedSucursal) {
                        setSucursal(fetchedSucursal);

                        const promocionesAnidadas = fetchedSucursal.domicilio?.sucursal?.promociones;

                        if (Array.isArray(promocionesAnidadas)) {
                            setPromociones(promocionesAnidadas);
                        } else {
                            console.error('Promociones no es un array:', promocionesAnidadas);
                        }
                    } else {
                        console.error('Sucursal no encontrada');
                    }
                } catch (error) {
                    console.error('Error al obtener la sucursal:', error);
                }
            }
        };

        fetchSucursal();
    }, [id, sucursalService, url]);

    const images = [
        'https://img.recraft.ai/YzQdbqFLrUUFTy38iVOlMVzyyDE7ha20IZDLyI0Ig1c/rs:fit:2048:1024:0/q:80/g:no/plain/abs://prod/images/c9f3bc73-744f-43c2-8708-25318a92f91f@avif',
        'https://img.recraft.ai/dkomNnrjkpuKru3PVNjFBaUE4tE7E_wRt7TrJqwg8ok/rs:fit:2048:1024:0/q:80/g:no/plain/abs://prod/images/be4e764b-f537-4eb2-8ac7-0a862d13e66b@avif',
        'https://img.recraft.ai/Gk6L66RxcniRldDdK13XTZhkYJd9hHn8DJZbstLzT7Q/rs:fit:2048:1024:0/q:80/g:no/plain/abs://prod/images/96991ea2-dce8-432a-af5b-2d4c975db4c3@avif',
    ];

    const nextSlide = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    };

    const handleAddToCart = (promocion: Promocion) => {
        console.log(`Added to cart: ${promocion.descripcionDescuento}`);
    };

    if (!sucursal) {
        return <Typography variant="body1">Cargando sucursal...</Typography>;
    }

    return (
        
        <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
            <Typography variant="h4" sx={{ my: 2, color: '#001F3F', fontFamily: 'Jersey 15', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Bienvenidos a la  {sucursal.nombre} de {sucursal.empresa.nombre}!
            </Typography>
            <Box className="slider-container" sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: '300px', mb: 3 }}>
                <Box className="slider" sx={{ display: 'flex', transition: 'transform 0.5s ease-in-out' }} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            className="slide"
                            sx={{
                                minWidth: '100%',
                                height: '300px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${image})`,
                                opacity: index === currentSlide ? 1 : 0,
                                transition: 'opacity 0.5s ease-in-out',
                            }}
                        />
                    ))}
                </Box>
                
                <IconButton className="prev" onClick={prevSlide} sx={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 1 }}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton className="next" onClick={nextSlide} sx={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: 1 }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box className="descripcion-container" sx={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', mt: 3 }}>
            <Typography variant="body1" sx={{ color: '#001F3F' }}>
    Bienvenido a nuestro sitio especializado en productos alimenticios frescos y promociones exclusivas. En nuestra plataforma, encontrarás una amplia variedad de productos de alta calidad, desde ingredientes frescos hasta platos listos para disfrutar. ¡Descubre las mejores ofertas y sabores para tus momentos especiales!
</Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
                <Grid  item>
                    <LinkCard  title="Promociones" link={`/sucursal/${id}/Promociones`} />
                </Grid>
                <Grid item>
                    <LinkCard title="Productos" link={`/sucursal/${id}/Articulos`} />
                </Grid>
            </Grid>
        </Container>
        
    );
};

export default HomeSucursal;
