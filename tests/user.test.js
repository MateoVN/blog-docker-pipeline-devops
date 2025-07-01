const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');

jest.setTimeout(30000); // 30 segundos para todo este test suite

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /auth/register', () => {
  it('debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/auth/register') // <- CORREGIDO
      .send({
        username: 'usuario_test',
        password: 'password123'
      });

    // Como estás usando `res.redirect('/auth/login')`, el status será 302
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/auth/login'); // Redirige correctamente
  });

  it('debería evitar duplicados', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'test', password: '123' });

    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'test', password: '456' });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain('Error al registrar usuario');
  });
});
