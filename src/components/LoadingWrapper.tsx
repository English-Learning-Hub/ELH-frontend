import React from 'react';
import {
  Box,
  CircularProgress,
  Backdrop,
  Typography,
  Fade,
} from '@mui/material';

interface LoadingWrapperProps {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  variant?: 'backdrop' | 'overlay' | 'inline';
  minHeight?: number | string;
}

export const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  size = 40,
  color = 'primary',
  variant = 'backdrop',
  minHeight = 200,
}) => {
  if (variant === 'backdrop') {
    return (
      <>
        {children}
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
          open={loading}
        >
          <Fade in={loading}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              <CircularProgress color={color} size={size} />
              {loadingText && (
                <Typography variant="h6" component="div" color="inherit">
                  {loadingText}
                </Typography>
              )}
            </Box>
          </Fade>
        </Backdrop>
      </>
    );
  }

  if (variant === 'overlay') {
    return (
      <Box position="relative" minHeight={minHeight}>
        {children}
        {loading && (
          <Fade in={loading}>
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255, 255, 255, 0.9)"
              zIndex={1}
              gap={2}
            >
              <CircularProgress color={color} size={size} />
              {loadingText && (
                <Typography variant="body1" component="div" color="text.secondary">
                  {loadingText}
                </Typography>
              )}
            </Box>
          </Fade>
        )}
      </Box>
    );
  }

  if (variant === 'inline') {
    return (
      <Box minHeight={minHeight}>
        {loading ? (
          <Fade in={loading}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={minHeight}
              gap={2}
            >
              <CircularProgress color={color} size={size} />
              {loadingText && (
                <Typography variant="body1" component="div" color="text.secondary">
                  {loadingText}
                </Typography>
              )}
            </Box>
          </Fade>
        ) : (
          children
        )}
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export const LoadingWrapperLinear: React.FC<LoadingWrapperProps & {
  progress?: number;
  showProgress?: boolean;
}> = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  color = 'primary',
  variant = 'overlay',
  minHeight = 200,
  progress,
  showProgress = false,
}) => {
  const LinearProgress = React.lazy(() => import('@mui/material/LinearProgress'));

  if (variant === 'overlay') {
    return (
      <Box position="relative" minHeight={minHeight}>
        {children}
        {loading && (
          <Fade in={loading}>
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255, 255, 255, 0.95)"
              zIndex={1}
              gap={2}
              p={3}
            >
              <Box width="100%" maxWidth={300}>
                <React.Suspense fallback={<div />}>
                  <LinearProgress
                    color={color}
                    variant={showProgress && progress !== undefined ? 'determinate' : 'indeterminate'}
                    value={progress}
                  />
                </React.Suspense>
              </Box>
              {loadingText && (
                <Typography variant="body1" component="div" color="text.secondary" textAlign="center">
                  {loadingText}
                </Typography>
              )}
              {showProgress && progress !== undefined && (
                <Typography variant="body2" component="div" color="text.secondary">
                  {Math.round(progress)}%
                </Typography>
              )}
            </Box>
          </Fade>
        )}
      </Box>
    );
  }

  return <LoadingWrapper {...{ children, loading, loadingText, color, variant, minHeight }} />;
};
