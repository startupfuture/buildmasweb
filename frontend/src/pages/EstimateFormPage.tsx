import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EstimateForm from '../components/EstimateForm';
import { getEstimate, createEstimate, updateEstimate, Material } from '../services/estimateService';
import type { CreateEstimateData } from '../services/estimateService';
import { Typography, Paper, Container } from '@mui/material';

const EstimateFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<(CreateEstimateData & { status?: string; materials: Material[] }) | null>(null);
  const [loading, setLoading] = useState(true);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      getEstimate(parseInt(id)).then(response => {
        setInitialData(response.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  const handleSubmit = (estimate: CreateEstimateData) => {
    const promise = isEditMode && id
      ? updateEstimate(parseInt(id), estimate)
      : createEstimate(estimate);

    promise.then(() => {
      navigate('/estimates');
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEditMode ? 'Edit Estimate' : 'Create Estimate'}
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <EstimateForm onSubmit={handleSubmit} initialData={initialData} />
        )}
      </Paper>
    </Container>
  );
};

export default EstimateFormPage;
