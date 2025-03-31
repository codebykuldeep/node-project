import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import CompareArrow from '@mui/icons-material/CompareArrows';
import classes from './no-data-in-table.module.css';

interface Props {
  message?: string;
  onRetry?: () => void;
}

const NoDataInTable: React.FC<Props> = ({ message = "No data available", onRetry }) => {
  return (
    <Stack 
      className={classes.container}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      
    >
      <CompareArrow sx={{ fontSize: '5rem', color: '#a0a0a0' }} />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
};

export default NoDataInTable;
