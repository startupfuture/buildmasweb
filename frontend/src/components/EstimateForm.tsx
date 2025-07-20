import React, { useState, useEffect } from 'react';
import type { CreateEstimateData, Material } from '../services/estimateService';
import { getClients } from '../services/clientService';
import { Box, TextField, Button, Grid, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

interface Client {
  id: number;
  name: string;
}

interface EstimateFormProps {
  onSubmit: (estimate: CreateEstimateData & { materials: Omit<Material, 'id' | 'estimateId'>[] }) => void;
  initialData?: (CreateEstimateData & { status?: string; materials: Material[] }) | null;
}

const EstimateForm: React.FC<EstimateFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [clientId, setClientId] = useState<number | '' >(initialData?.clientId || '');
  const [laborCost, setLaborCost] = useState<number>(initialData?.laborCost || 0);
  const [materials, setMaterials] = useState<Omit<Material, 'id' | 'estimateId'>[]>(initialData?.materials || []);
  const [clients, setClients] = useState<Client[]>([]);
  const isReadOnly = initialData?.status === 'completed';

  useEffect(() => {
    getClients().then(response => {
      setClients(response.data);
    });
  }, []);

  const handleMaterialChange = (index: number, field: keyof Omit<Material, 'id' | 'estimateId'>, value: string | number) => {
    const newMaterials = [...materials];
    (newMaterials[index] as any)[field] = value;
    setMaterials(newMaterials);
  };

  const addMaterial = () => {
    setMaterials([...materials, { name: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const materialsTotal = materials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);
    const totalCost = (laborCost || 0) + materialsTotal;
    onSubmit({ title, description, clientId: clientId || undefined, laborCost, materialsTotal, totalCost, materials });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required InputProps={{ readOnly: isReadOnly }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={3} InputProps={{ readOnly: isReadOnly }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              value={clientId}
              label="Client"
              onChange={(e) => setClientId(e.target.value as number)}
              readOnly={isReadOnly}
            >
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Labor Cost" type="number" value={laborCost} onChange={(e) => setLaborCost(parseFloat(e.target.value))} fullWidth InputProps={{ readOnly: isReadOnly }} />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Materials</Typography>
      {materials.map((material, index) => (
        <Grid container spacing={1} key={index} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={4}><TextField label="Name" value={material.name} onChange={(e) => handleMaterialChange(index, 'name', e.target.value)} fullWidth InputProps={{ readOnly: isReadOnly }} /></Grid>
          <Grid item xs={2}><TextField label="Quantity" type="number" value={material.quantity} onChange={(e) => handleMaterialChange(index, 'quantity', parseFloat(e.target.value))} fullWidth InputProps={{ readOnly: isReadOnly }} /></Grid>
          <Grid item xs={2}><TextField label="Unit Price" type="number" value={material.unitPrice} onChange={(e) => handleMaterialChange(index, 'unitPrice', parseFloat(e.target.value))} fullWidth InputProps={{ readOnly: isReadOnly }} /></Grid>
          <Grid item xs={2}><Typography>Total: ${(material.quantity * material.unitPrice).toFixed(2)}</Typography></Grid>
          <Grid item xs={2}><IconButton onClick={() => removeMaterial(index)} color="error" disabled={isReadOnly}><DeleteIcon /></IconButton></Grid>
        </Grid>
      ))}
      <Button startIcon={<AddCircleOutlineIcon />} onClick={addMaterial} sx={{ mt: 1 }} disabled={isReadOnly}>
        Add Material
      </Button>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isReadOnly}>
        Save Estimate
      </Button>
    </Box>
  );
};

export default EstimateForm;
