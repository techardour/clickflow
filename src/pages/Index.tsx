import { Box, Button, Typography, Container } from '@mui/material';
import logo from '../assets/fundly_logo.png'; 

const Landing = () => {
    const handleNext = () => {
        window.location.href = 'https://www.fundly.ai'; // Redirect to the website
    }

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <img src={logo} alt="Logo" width="100" />
        <Typography variant="h4" mt={4}>
            India’s First Pharma-Focused Supply Chain Financing Platform
        </Typography>
        <Typography variant="h5" mt={2} color="textSecondary">
           Enabling Seamless Credit & Payments Solutions for the Pharma Ecosystem
            We’ve got your back. Our smart financial solutions keep your business growing and your cash flow steady, so you can focus on what you do best.
        </Typography>
        <Typography variant="h6" mt={2} color="textSecondary">
           We’ve got your back. Our smart financial solutions keep your business growing and your cash flow steady, so you can focus on what you do best.
        </Typography>
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3 }}>
          Visit Our Website
        </Button>
    </Container>
  );
};

export default Landing;