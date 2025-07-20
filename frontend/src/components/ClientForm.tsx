import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface ClientFormProps {
  onSubmit: (client: { name: string }) => void;
  initialData?: { name: string } | null;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Client Name"
        name="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Client
      </Button>
    </Box>
  );
};

export default ClientForm;
