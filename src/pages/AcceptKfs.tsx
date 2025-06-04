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
import logo from '../assets/fundly_logo.png';
import DownloadIcon from '@mui/icons-material/Download';

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
        <Box 
        sx={{ 
            width: '100%', 
            backgroundColor: '#1976d2', // Material UI primary blue
            py: 2,
            mb: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
        }}
        >
        <Container maxWidth="xl">
            <Typography 
            variant="h6" 
            align="left" 
            sx={{ 
                color: 'white',
                fontWeight: 500,
            }}
            >
            Key Facts Statement
            </Typography>
        </Container>
        </Box>    

        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { xs: 300, md: 400 }, my: 2, width: '100%' }}>
            <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                width: '100%',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                minHeight: 400,
                maxHeight: { xs: 300, md: 400 },
            }}
            >
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 0,
                pl: 1,
                pr: 1,
                backgroundColor: '#f5f5f5',
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="body1"
                    align="left"
                    sx={{
                    color: 'grey.800',
                    fontWeight: 500,
                    }}
                >
                    PDF Viewer
                </Typography>
                </Box>
                <Button variant="text" sx={{ ml: 2 }}>
                <DownloadIcon sx={{ mr: 1 }} />
                Download
                </Button>
            </Box>
            <Stack spacing={3} sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
                <Box sx={{ pl: 2 }}>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
                </Typography>
                <Typography variant="body1" component="ul">
                    <li>I have read and understood the Key Facts Statement (KFS)</li>
                    <li>I understand this is a legally binding document</li>
                    <li>I accept all terms and conditions outlined in the KFS</li>
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
                sx={{
                    py: 1,
                    fontSize: '1.1rem',
                    width: '100%',
                    alignSelf: 'center'
                }}
            >
                Accept & Continue
            </Button>
        </Box>

    </>
  );
};

export default AcceptKfs;