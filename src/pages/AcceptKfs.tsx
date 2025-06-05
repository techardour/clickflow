import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel,
  Paper,
  Stack,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import DownloadIcon from '@mui/icons-material/Download';
import styles from '../styles/AcceptKfs.module.css';

const AcceptKfs = () => {
  const { loanId, documentId } = useParams();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = storage.getToken();
      if (!token) {
        navigate(`/kfs/${loanId}/${documentId}`);
        return;
      }
      setIsAuthenticated(true);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [loanId, documentId, navigate]);

  const handleAccept = () => {
    if (!isChecked) {
      setError('Please review the entire document before accepting');
      return;
    }
    // Handle acceptance logic here
    console.log('Accepted', { loanId, documentId });
  };
  return (
    <>
      {isLoading ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      ) : !isAuthenticated ? (
        <Container sx={{ textAlign: 'center', mt: 10 }}>
          <Typography color="error" variant="h6">
            Authentication required. Redirecting...
          </Typography>
        </Container>
      ) : (
        <>
          <Box className={styles.header}>
            <Container maxWidth="xl">
              <Typography variant="h6" align="left" className={styles.headerText}>
                Key Facts Statement
              </Typography>
            </Container>
          </Box>

      <Container maxWidth="xl" className={styles.container}>
        <Paper elevation={3} className={styles.paper}>
          <Box className={styles.pdfHeader}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" align="left" className={styles.pdfTitle}>
                PDF Viewer
              </Typography>
            </Box>
            <Button variant="text" className={styles.downloadButton}>
              <DownloadIcon sx={{ mr: 1 }} />
              Download
            </Button>
          </Box>
          <Stack className={styles.contentStack}>
            <Box className={styles.contentBox}>
                {/* Placeholder for PDF content */}
              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>
              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              <Typography variant="body1" align="left" className={styles.contentText}>
                This is where the PDF content will be displayed. 
                You can integrate a PDF viewer component here.
              </Typography>              
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Box sx={{ width: '100%' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                if (e.target.checked) setError('');
              }}
            />
          }
          label="I agree to the loan terms and accept the Key Facts Statement (KFS)"
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleAccept}
          className={styles.acceptButton}
        >
          Accept & Continue
        </Button>      </Box>
        </>
      )}
    </>
  );
};

export default AcceptKfs;