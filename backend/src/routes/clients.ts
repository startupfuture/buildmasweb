import { Router } from 'express';
import { db } from '../db';
import { clients, users } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET all clients with user info
router.get('/', async (req, res) => {
  const allClients = await db.select({
    id: clients.id,
    name: clients.name,
    user: {
      id: users.id,
      fullName: users.fullName,
      email: users.email
    }
  }).from(clients).leftJoin(users, eq(clients.userId, users.id));
  
  res.json(allClients);
});

// GET a single client by id
router.get('/:id', async (req, res) => {
  const result = await db.select({
    id: clients.id,
    name: clients.name,
    user: {
      id: users.id,
      fullName: users.fullName,
      email: users.email
    }
  }).from(clients).leftJoin(users, eq(clients.userId, users.id)).where(eq(clients.id, parseInt(req.params.id)));

  if (result.length === 0) {
    return res.status(404).send('Client not found');
  }
  res.json(result[0]);
});

// POST a new client
router.post('/', async (req, res) => {
  const { name } = req.body;
  const userId = req.user?.uid;

  if (!name || !userId) {
    return res.status(400).send('Name and authenticated user are required');
  }
  const newClient = await db.insert(clients).values({ name, userId }).returning();
  res.status(201).json(newClient[0]);
});

// PUT (update) a client
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  const updatedClient = await db.update(clients)
    .set({ name })
    .where(eq(clients.id, parseInt(req.params.id)))
    .returning();
  if (updatedClient.length === 0) {
    return res.status(404).send('Client not found');
  }
  res.json(updatedClient[0]);
});

// DELETE a client
router.delete('/:id', async (req, res) => {
  const deletedClient = await db.delete(clients)
    .where(eq(clients.id, parseInt(req.params.id)))
    .returning();
  if (deletedClient.length === 0) {
    return res.status(404).send('Client not found');
  }
  res.status(204).send();
});

export default router;
