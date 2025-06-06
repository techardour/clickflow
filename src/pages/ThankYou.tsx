import { Box, Typography, Container } from '@mui/material';
import logo from '../assets/fundly_logo.png';

const ThankYou = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <img src={logo} alt="Logo" width="100" style={{ marginBottom: '2rem' }} />
      <Box sx={{ 
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography variant="h4" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          You have successfully signed your Key Facts Statement
        </Typography>
      </Box>
    </Container>
  );
};

export default ThankYou;
