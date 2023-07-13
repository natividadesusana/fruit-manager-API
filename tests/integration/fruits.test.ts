import supertest from 'supertest';
import app from 'app';
import fruitsService from 'services/fruits-service';
import { createFruit } from '../factories/fruits-factory';

const server = supertest(app);

describe('Fruits API', () => {
  describe('POST /fruits', () => {
    it('should return 201 when inserting a fruit', async () => {
      const response = await server
        .post('/fruits')
        .send({ name: 'Uva', price: 1.99 });

      expect(response.status).toBe(201);
    });

    it('should return 409 when inserting a fruit that is already registered', async () => {
      const existingFruit = { name: 'Uva', price: 1.99 };
      fruitsService.createFruit(existingFruit);

      const response = await server
        .post('/fruits')
        .send(existingFruit);

      expect(response.status).toBe(409);
    });

    it('should return 422 when inserting a fruit with data missing', async () => {
      const response = await server
        .post('/fruits')
        .send({ name: 'Uva' });

      expect(response.status).toBe(422);
    });
  });

  describe('GET /fruits', () => {
    it('should return 404 when trying to get a fruit that doesn\'t exist', async () => {
      const response = await server.get('/fruits/123');

      expect(response.status).toBe(404);
    });

    it('should return 400 when id param is not valid', async () => {
      const response = await server.get('/fruits/abc');

      expect(response.status).toBe(400);
    });

    it('should return a fruit given an id', async () => {
      const newFruit = createFruit('Uva', 1.99);

      fruitsService.createFruit(newFruit);

      const response = await server.get(`/fruits/${newFruit.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newFruit);
    });

    it('should return all fruits', async () => {
      const fruits = [
        { name: 'Uva', price: 1.99 },
        { name: 'Banana', price: 0.99 },
      ];

      fruits.forEach(fruit => {
        fruitsService.createFruit(fruit);
      });

      const response = await server.get('/fruits');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(fruits);
    });
  });
});
