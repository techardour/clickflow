import { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel,
  Paper,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { documentApi } from '../utils/api';
import DownloadIcon from '@mui/icons-material/Download';
import styles from '../styles/AcceptKfs.module.css';

const AcceptKfs = () => {
  const { loanId, documentId } = useParams();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
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

  useEffect(() => {
    const fetchPdf = async () => {
      if (!documentId || !isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const documentUrl = await documentApi.fetchPdf(documentId);
        setPdfUrl(documentUrl);
        setPdfError(null);
      } catch (err) {
        console.error('Error fetching document:', err);
        setPdfError('Failed to load the document. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();
  }, [documentId, isAuthenticated]);

  const handleAccept = useCallback(() => {
    if (!isChecked) {
      setError('Please review the entire document before accepting');
      return;
    }
    // Handle acceptance logic here
    console.log('Accepted', { loanId, documentId });
  }, [isChecked, loanId, documentId]);

  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  }, [pdfUrl]);

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
                <Button 
                  variant="text" 
                  className={styles.downloadButton}
                  onClick={handleDownload}
                  disabled={!pdfUrl}
                >
                  <DownloadIcon sx={{ mr: 1 }} />
                  Download
                </Button>
              </Box>
              <Stack className={styles.contentStack}>
                {pdfError ? (
                  <Alert severity="error" sx={{ m: 2 }}>
                    {pdfError}
                  </Alert>
                ) : pdfUrl ? (
                  <Box className={styles.contentBox}>
                    <iframe
                      src={pdfUrl}
                      style={{
                        width: '100%',
                        height: '500px',
                        border: 'none'
                      }}
                      title="PDF Viewer"
                    />
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                  </Box>
                )}
              </Stack>
            </Paper>
          </Container>

          <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
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
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={handleAccept}
              className={styles.acceptButton}
              sx={{ mt: 2 }}
              disabled={!isChecked || !pdfUrl || !!pdfError}
            >
              Accept & Continue
            </Button>
          </Container>
        </>
      )}
    </>
  );
};

export default AcceptKfs;