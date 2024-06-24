import { Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NoResults = () => {
  return (
    <Box textAlign="center" mt={4}>
      <WarningIcon sx={{ fontSize: 60, color: '#6a1b9a' }} />
      <Typography variant="body1" color="#6a1b9a" mt={2}>
        No se encontraron resultados que coincidan con la búsqueda.
      </Typography>
    </Box>
  );
};

export default NoResults;
