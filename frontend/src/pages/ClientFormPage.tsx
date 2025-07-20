import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientForm from '../components/ClientForm';
import { getClient, createClient, updateClient } from '../services/clientService';
import { Typography, Paper, Container } from '@mui/material';

interface ClientData {
  name: string;
}

const ClientFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<ClientData | null>(null);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      getClient(parseInt(id)).then(response => {
        setInitialData(response.data);
      });
    }
  }, [id, isEditMode]);

  const handleSubmit = async (client: ClientData) => {
    console.log('Submitting client:', client);
    try {
      if (isEditMode && id) {
        await updateClient(parseInt(id), { name: client.name });
      } else {
        await createClient({ name: client.name });
      }
      console.log('Submission successful, navigating...');
      navigate('/clients');
    } catch (error) {
      console.error('Failed to submit client:', error);
      // Aquí podrías establecer un estado de error para mostrar un mensaje al usuario
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Client' : 'Create Client'}
        </Typography>
        <ClientForm onSubmit={handleSubmit} initialData={initialData} />
      </Paper>
    </Container>
  );
};

export default ClientFormPage;
