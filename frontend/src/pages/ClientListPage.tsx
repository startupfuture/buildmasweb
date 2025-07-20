import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getClients, deleteClient } from '../services/clientService';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Box, Fab 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Client {
  id: number;
  name: string;
  user: {
    id: string;
    fullName: string | null;
    email: string | null;
  } | null;
}

const ClientListPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = () => {
    getClients().then(response => {
      setClients(response.data);
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = (id: number) => {
    deleteClient(id).then(() => {
      fetchClients(); // Refresh list after delete
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Clients
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.user?.email || 'N/A'}</TableCell>
                <TableCell align="right">
                  <IconButton component={RouterLink} to={`/clients/edit/${client.id}`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(client.id)} color="error">
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
        to="/clients/new"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ClientListPage;