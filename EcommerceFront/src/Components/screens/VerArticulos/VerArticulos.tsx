import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, TextField, Select, MenuItem, FormControl, InputLabel, Box, Button, Tooltip, IconButton } from '@mui/material';
import ArticuloService from '../../../service/ArticuloService';
import CategoriaService from '../../../service/CategoriaService';
import { SelectChangeEvent } from '@mui/material';
import { useParams } from 'react-router-dom';

import NoResults from '../../ui/Cards/NoResults/NoResults';
import TableComponent from '../../ui/TableComponent/TableComponent';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const VerArticulos = () => {
  const { id } = useParams<{ id: string }>();
  const [articulos, setArticulos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const articuloService = new ArticuloService();
  const categoriaService = new CategoriaService();
  const url = import.meta.env.VITE_API_URL;
  const { addToCart } = useCart();
  const { userRole } = useAuth();

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const articulosData = await articuloService.getAll(url + '/api/manufacturados');
        if (articulosData.length === 0) {
          setError('No se encontraron artículos.');
        } else {
          setArticulos(articulosData);
        }
      } catch (error) {
        setError('Error al obtener los artículos.');
        console.error('Error al obtener los artículos:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategorias = async () => {
      try {
        const categoriasData = await categoriaService.getAll(url + '/api/categorias');
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchArticulos();
    fetchCategorias();
  }, [url]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredArticulos = articulos.filter((articulo) =>
    articulo.denominacion.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || articulo.categoria.denominacion === selectedCategory)
  );

  const columns: Column[] = [
    { id: 'imagen', label: 'Imagen', renderCell: (row) => <img src={row.imagenes[0]?.url} alt="Articulo" style={{ width: '50px', height: '50px', borderRadius: '10px' }} /> },
    { id: 'denominacion', label: 'Denominación', renderCell: (row) => row.denominacion },
    { id: 'categoria', label: 'Categoría', renderCell: (row) => row.categoria.denominacion || '-' },
    { id: 'precioVenta', label: 'Precio', renderCell: (row) => `$${row.precioVenta}` },
    {
      id: 'actions',
      label: 'Acciones',
      renderCell: (row) => (
        <>
          <Tooltip title="Ver Detalle">
            <Button sx={{padding:'5px', backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' }, width: '60%' }} onClick={() => handleVerDetalle(row)}>
             Ver Detalle  <InfoIcon />
            </Button>
          </Tooltip>
          {(userRole === 'VISOR') && (
            <Tooltip title="Agregar al Carrito">
              <Button sx={{padding:'5px', backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' }, width: '60%' }}onClick={() => handleAgregarAlCarrito(row)}>
                Agregar al carrito<ShoppingCartIcon />
              </Button>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const handleVerDetalle = (row: any) => {
    window.location.href = `/detalles/${row.id}`;
  };

  const handleAgregarAlCarrito = (row: any) => {
    addToCart(row.id, [row]);
  };

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5dc', padding: '2rem', borderRadius: '8px' }}>
      <Typography variant="h5" sx={{ my: 2, color: 'black' }}>
        Artículos Disponibles
      </Typography>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { backgroundColor: '#e0ebc2' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="select-category-label">Categoría</InputLabel>
            <Select
              labelId="select-category-label"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Categoría"
              sx={{ backgroundColor: '#e0ebc2' }}
            >
              <MenuItem value="">Todas</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.denominacion}>{categoria.denominacion}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress /> 
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : filteredArticulos.length === 0 ? (
        <NoResults />
      ) : (
        <TableComponent
          data={filteredArticulos}
          columns={columns}
          keyField="id"
          pagination
        />
      )}
       <Link to={`/sucursal/${id}/home`} style={{marginTop:'20px',  display: 'flex', justifyContent: 'left', alignItems: 'left' , textDecoration: 'none', color: 'inherit' }} >
                <Button sx={{ backgroundColor: '#a6c732', color: 'white', '&:hover': { backgroundColor: '#b9d162' },width:'10%'}} size="small">Volver</Button>
            </Link>
    </Container>
  );
};

export default VerArticulos;
