const request = require('supertest');
const { app } = require('../src/index');
const db = require('../src/db');

describe('Order routes', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterEach(async () => {
    await db('orders').truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should get all orders', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ product: 'Test Product', quantity: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('product', 'Test Product');
  });

  it('should return an error if product is missing', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ quantity: 1 });
    expect(res.statusCode).toEqual(400);
  });
});
