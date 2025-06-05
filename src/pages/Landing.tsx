import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import logo from '../assets/fundly_logo.png'; 
import { useAuth } from '../hooks/useAuth';
import { storage } from '../utils/storage';

const Landing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);
  const { loanId, documentId } = useParams();
  const [error, setError] = useState('');
  const { login, loading, error: authError } = useAuth();
  
  const isKfsPath = window.location.pathname.startsWith('/kfs/');
  const isValid = isKfsPath && loanId && documentId;

  const handleAuthentication = async () => {
    try {
      const username = import.meta.env.VITE_USERNAME;
      const password = import.meta.env.VITE_PASSWORD;

      await login(username, password);
      // If login successful, start the redirect countdown
      startRedirectCountdown();
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    }
  };
  
  const startRedirectCountdown = () => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          navigate(`/accept-kfs/${loanId}/${documentId}`);
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    // Clear any existing token when landing page loads
    storage.removeToken();
  }, []);

  useEffect(() => {
    if (!isKfsPath) {
      setError('Invalid URL: Must start with /kfs/');
      return;
    }

    if (isValid) {
      handleAuthentication();
    }
  }, [isValid, loanId, documentId, isKfsPath]);

  const handleNext = () => {
    if (isValid) navigate(`/accept-kfs/${loanId}/${documentId}`);
  };
  

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <img src={logo} alt="Logo" width="100" />
      {loading ? (
        <Box mt={4}>
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Authenticating...
          </Typography>
        </Box>
      ) : (
        <>
          <Typography 
            variant="h4" 
            mt={4} 
            color={error || authError ? 'error' : 'initial'}
          >
            {error || authError ? (error || authError) : isValid 
              ? `Redirecting to key facts statement page in ${counter}` 
              : 'Invalid request parameters'}
          </Typography>
          {isValid && !error && !authError && (
            <Button 
              variant="contained" 
              onClick={handleNext} 
              sx={{ mt: 3 }}
            >
              Next
            </Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Landing;