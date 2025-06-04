import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
import logo from '../assets/fundly_logo.png'; 

const Landing = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);
  const { loanId, documentId } = useParams();
  const [error, setError] = useState('');
  
  const isKfsPath = window.location.pathname.startsWith('/kfs/');
  const isValid = isKfsPath && loanId && documentId;

  useEffect(() => {
    if (!isKfsPath) {
      setError('Invalid URL: Must start with /kfs/');
      return;
    }

    if (isValid) {
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
    }
  }, [isValid, navigate, loanId, documentId, isKfsPath]);

  const handleNext = () => {
    if (isValid) navigate(`/accept-kfs/${loanId}/${documentId}`);
  };

  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <img src={logo} alt="Logo" width="100" />
      <Typography variant="h4" mt={4} color={error ? 'error' : 'initial'}>
        {error ? error : isValid 
          ? `Redirecting to key facts statement page in ${counter}` 
          : 'Invalid request parameters'}
      </Typography>
      {isValid && (
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3 }}>
          Next
        </Button>
      )}
    </Container>
  );
};

export default Landing;