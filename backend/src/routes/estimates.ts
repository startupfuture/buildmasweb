import { Router } from 'express';
import { db } from '../db';
import { estimates, materials } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Helper function to determine status
const calculateStatus = (estimate: { laborCost?: number | null; materialsTotal?: number | null; clientId?: number | null }): 'initiated' | 'in progress' => {
  if (estimate.clientId && estimate.laborCost && estimate.materialsTotal) {
    return 'in progress';
  }
  return 'initiated';
};

// GET all estimates (no change needed here for now)
router.get('/', async (req, res) => {
  const allEstimates = await db.select().from(estimates);
  res.json(allEstimates);
});

// GET a single estimate with its materials
router.get('/:id', async (req, res) => {
  const estimateId = parseInt(req.params.id);
  const estimateResult = await db.select().from(estimates).where(eq(estimates.id, estimateId));
  
  if (estimateResult.length === 0) {
    return res.status(404).send('Estimate not found');
  }

  const materialsResult = await db.select().from(materials).where(eq(materials.estimateId, estimateId));

  const response = {
    ...estimateResult[0],
    materials: materialsResult
  };

  res.json(response);
});

// POST a new estimate with materials
router.post('/', async (req, res) => {
  const { title, description, laborCost, materialsTotal, totalCost, clientId, materials: materialsData } = req.body;
  
  if (!title) {
    return res.status(400).send('Title is required');
  }

  const status = calculateStatus({ laborCost, materialsTotal, clientId });

  try {
    const newEstimate = await db.transaction(async (tx) => {
      const newEstimateResult = await tx.insert(estimates).values({ title, description, laborCost, materialsTotal, totalCost, status, clientId }).returning();
      const newEstimate = newEstimateResult[0];

      if (materialsData && materialsData.length > 0) {
        const materialsToInsert = materialsData.map((m: any) => ({
          ...m,
          estimateId: newEstimate.id
        }));
        await tx.insert(materials).values(materialsToInsert);
      }

      return newEstimate;
    });

    res.status(201).json(newEstimate);
  } catch (error) {
    console.error('Failed to create estimate:', error);
    res.status(500).send('Failed to create estimate');
  }
});

// PUT (update) an estimate with materials
router.put('/:id', async (req, res) => {
  const estimateId = parseInt(req.params.id);

  const existingEstimate = await db.select().from(estimates).where(eq(estimates.id, estimateId));
  if (existingEstimate.length > 0 && existingEstimate[0].status === 'completed') {
    return res.status(403).send('Cannot modify a completed estimate.');
  }

  const { title, description, laborCost, materialsTotal, totalCost, status: statusFromRequest, clientId, materials: materialsData } = req.body;
  const status = statusFromRequest || calculateStatus({ laborCost, materialsTotal, clientId });

  try {
    const updatedEstimate = await db.transaction(async (tx) => {
      // If materials data is provided, update materials.
      // Otherwise, leave them untouched.
      if (materialsData) {
        // Delete old materials
        await tx.delete(materials).where(eq(materials.estimateId, estimateId));

        // Insert new materials
        if (materialsData.length > 0) {
          const materialsToInsert = materialsData.map((m: any) => ({
            name: m.name,
            quantity: m.quantity,
            unitPrice: m.unitPrice,
            estimateId: estimateId
          }));
          await tx.insert(materials).values(materialsToInsert);
        }
      }

      // Update the estimate itself
      const updatedEstimateResult = await tx.update(estimates)
        .set({ title, description, laborCost, materialsTotal, totalCost, status, clientId })
        .where(eq(estimates.id, estimateId))
        .returning();

      return updatedEstimateResult[0];
    });

    res.json(updatedEstimate);
  } catch (error) {
    console.error('Failed to update estimate:', error);
    res.status(500).send('Failed to update estimate');
  }
});

// DELETE an estimate
router.delete('/:id', async (req, res) => {
  const estimateId = parseInt(req.params.id);
  try {
    await db.transaction(async (tx) => {
      await tx.delete(materials).where(eq(materials.estimateId, estimateId));
      await tx.delete(estimates).where(eq(estimates.id, estimateId));
    });
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete estimate:', error);
    res.status(500).send('Failed to delete estimate');
  }
});

export default router;
