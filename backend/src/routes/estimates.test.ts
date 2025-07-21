import request from 'supertest';
import express from 'express';
import estimatesRouter from './estimates';
import { pool } from '../db';
import { db } from '../db';
import { estimates, materials } from '../db/schema';

const app = express();
app.use(express.json());
app.use('/api/estimates', estimatesRouter);

// Clean up the database before and after tests
beforeAll(async () => {
  await db.delete(materials);
  await db.delete(estimates);
});

afterAll(async () => {
  await pool.end();
});

describe('Estimates API', () => {
  let newEstimateId: number;

  it('should create a new estimate', async () => {
    const res = await request(app)
      .post('/api/estimates')
      .send({
        title: 'Test Estimate',
        description: 'A test estimate',
        laborCost: 100,
        materials: [{ name: 'Test Material', quantity: 1, unitPrice: 50 }],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    newEstimateId = res.body.id;
  });

  it('should get all estimates', async () => {
    const res = await request(app).get('/api/estimates');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single estimate by id', async () => {
    const res = await request(app).get(`/api/estimates/${newEstimateId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', newEstimateId);
    expect(res.body).toHaveProperty('materials');
  });

  it('should update an estimate', async () => {
    const res = await request(app)
      .put(`/api/estimates/${newEstimateId}`)
      .send({ title: 'Updated Test Estimate' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Estimate');
  });

  it('should mark an estimate as completed', async () => {
    const res = await request(app)
      .put(`/api/estimates/${newEstimateId}`)
      .send({ status: 'completed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'completed');
  });

  it('should NOT modify a completed estimate', async () => {
    const res = await request(app)
      .put(`/api/estimates/${newEstimateId}`)
      .send({ title: 'This Should Fail' });
    expect(res.statusCode).toEqual(403);
  });

  it('should delete an estimate', async () => {
    const res = await request(app).delete(`/api/estimates/${newEstimateId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/api/estimates/${newEstimateId}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
