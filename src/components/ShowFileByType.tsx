import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useRef, useMemo } from 'react';

interface ShowFileByTypeProps {
  fileUrl: string;
  fileType?: string;
  width?: string | number;
  height?: string | number;
  onLoadSuccess?: () => void;
  onError?: () => void;
}

const ShowFileByType = ({
  fileUrl,
  fileType = 'application/pdf',
  width = '100%',
  height = '100%',
  onLoadSuccess,
  onError
}: ShowFileByTypeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Determine file type from URL if not provided
  const detectedFileType = useMemo(() => {
    if (fileType !== 'application/pdf') return fileType;
    const extension = fileUrl?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      default:
        return 'application/pdf';
    }
  }, [fileUrl, fileType]);

  useEffect(() => {
    // Function to handle load success
    const handleLoad = () => {
      if (iframeRef.current) {
        onLoadSuccess?.();
      }
    };

    // Function to handle load error
    const handleError = () => {
      onError?.();
    };

    // Add event listeners
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
    }

    // Clean up event listeners
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      }
    };
  }, [fileUrl, onLoadSuccess, onError]);

  if (!fileUrl) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Add query parameters to disable toolbar and other controls
  const urlWithParams = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&view=FitH`;

  return (
    <Box
      component="iframe"
      ref={iframeRef}
      src={urlWithParams}
      sx={{
        width,
        height,
        border: 'none',
        borderRadius: '4px',
        bgcolor: 'background.paper',
      }}
      title="File Viewer"
    />
  );
};

export default ShowFileByType;
