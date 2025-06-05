import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel,
  Paper,
  Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import styles from '../styles/AcceptKfs.module.css';

const AcceptKfs = () => {
  const { loanId, documentId } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

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
        </Button>
      </Box>
    </>
  );
};

export default AcceptKfs;