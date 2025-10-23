const request = require('supertest');
const { app } = require('../src/index');
const db = require('../src/db');

describe('User routes', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterEach(async () => {
    await db('users').truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test User');
  });

  it('should return an error if name is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com' });
    expect(res.statusCode).toEqual(400);
  });
});
