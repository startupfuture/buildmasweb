import { Router } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { sql } from 'drizzle-orm';

const router = Router();

router.post('/sync', async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  try {
    await db.insert(users).values({
      id: user.uid,
      email: user.email,
      fullName: user.name || null, // Firebase a veces no tiene el nombre
    }).onConflictDoNothing();

    res.status(200).send({ message: 'User synced' });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).send({ message: 'Error syncing user' });
  }
});

export default router;
