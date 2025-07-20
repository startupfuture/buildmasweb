import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getEstimates, deleteEstimate, updateEstimate } from '../services/estimateService';
import type { Estimate } from '../services/estimateService';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Box, Fab, Chip, Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'initiated':
      return { backgroundColor: 'yellow', color: 'black' };
    case 'in progress':
      return { backgroundColor: 'orange', color: 'white' };
    case 'completed':
      return { backgroundColor: 'green', color: 'white' };
    default:
      return {};
  }
};

const EstimateListPage: React.FC = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  const fetchEstimates = () => {
    getEstimates().then(response => {
      setEstimates(response.data);
    });
  };

  useEffect(() => {
    fetchEstimates();
  }, []);

  const handleDelete = (id: number) => {
    deleteEstimate(id).then(() => {
      fetchEstimates();
    });
  };

  const handleComplete = (estimate: Estimate) => {
    updateEstimate(estimate.id, { ...estimate, status: 'completed' }).then(() => {
      fetchEstimates();
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Estimates
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimates.map(estimate => (
              <TableRow key={estimate.id}>
                <TableCell>{estimate.title}</TableCell>
                <TableCell>{estimate.clientId}</TableCell>
                <TableCell>${estimate.totalCost?.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip label={estimate.status} style={getStatusStyle(estimate.status)} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<CheckCircleIcon />}
                    disabled={!estimate.clientId || estimate.status !== 'in progress'}
                    onClick={() => handleComplete(estimate)}
                    sx={{ mr: 1 }}
                  >
                    {estimate.clientId ? 'Complete' : 'TO BE ASSIGN'}
                  </Button>
                  <IconButton component={RouterLink} to={`/estimates/edit/${estimate.id}`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(estimate.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab 
        color="primary" 
        aria-label="add" 
        component={RouterLink} 
        to="/estimates/new"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default EstimateListPage;
