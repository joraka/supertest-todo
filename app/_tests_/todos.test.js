const { expect, describe, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

describe('Positive tests', () => {
  describe('Get todo', () => {
    test('GET /todos/ - should return all todos', async () => {
      const res = await request(app).get('/todos/');

      expect(res.statusCode).toBe(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      res.body.forEach((todo) => {
        ['id', 'title', 'completed'].forEach((key) => expect(todo).toHaveProperty(key));

        expect(typeof todo.id).toBe('number');
        expect(todo.id).toBeGreaterThan(0);
        expect(typeof todo.title).toBe('string');
        expect(todo.title.length).toBeGreaterThan(0);
        expect(typeof todo.completed).toBe('boolean');
      });
    });

    test('GET /todos/1 - should return todo with id 1', async () => {
      const res = await request(app).get('/todos/1');

      expect(res.statusCode).toBe(200);

      ['id', 'title', 'completed'].forEach((key) => expect(res.body).toHaveProperty(key));

      expect(typeof res.body.id).toBe('number');
      expect(res.body.id).toBeGreaterThan(0);
      expect(typeof res.body.title).toBe('string');
      expect(res.body.title.length).toBeGreaterThan(0);
      expect(typeof res.body.completed).toBe('boolean');
    });
  });

  describe('Create todo', () => {
    test('POST /todos/ - should create a new todo', async () => {
      const reqBody = {
        title: 'new todo',
      };
      const res = await request(app).post('/todos').send(reqBody);

      expect(res.statusCode).toBe(201);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.id).toBe('number');
      expect(res.body.id).toBeGreaterThan(0);
      expect(typeof res.body.title).toBe('string');
      expect(res.body.title).toBe(reqBody.title);
      expect(typeof res.body.completed).toBe('boolean');
    });
  });

  describe('Update todo', () => {
    test('PUT /todos/1 - should update todo with id 1', async () => {
      const reqBody = {
        title: 'Updated todo name',
        completed: true,
      };
      const res = await request(app).put('/todos/1').send(reqBody);

      expect(res.statusCode).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.id).toBe('number');
      expect(res.body.id).toBe(1);
      expect(typeof res.body.title).toBe('string');
      expect(res.body.title).toBe(reqBody.title);
      expect(typeof res.body.completed).toBe('boolean');
      expect(res.body.completed).toBe(reqBody.completed);
    });
  });

  describe('Delete todo', () => {
    test('DELETE /todos/1 - should delete todo with id 1', async () => {
      const res = await request(app).delete('/todos/1');

      expect(res.statusCode).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(typeof res.body.id).toBe('number');
      expect(res.body.id).toBe(1);
      expect(typeof res.body.title).toBe('string');
      expect(res.body.title.length).toBeGreaterThan(0);
      expect(typeof res.body.completed).toBe('boolean');
    });
  });
});

describe('Negative tests', () => {
  describe('Get todo', () => {
    test('GET /todos/-1 - should show error when getting non existing todo', async () => {
      const res = await request(app).get('/todos/-1');

      expect(res.statusCode).toBe(404);

      expect(typeof res.body).toBe('object');
      expect(typeof res.body.message).toBe('string');
      expect(res.body.message).toBe('Todo not found');
    });
  });

  describe('Update todo', () => {
    test('PUT /todos/-1 - should show error when updating non existing todo', async () => {
      const reqBody = {
        title: 'Updated todo name',
        completed: true,
      };
      const res = await request(app).put('/todos/-1').send(reqBody);

      expect(res.statusCode).toBe(404);

      expect(typeof res.body).toBe('object');
      expect(typeof res.body.message).toBe('string');
      expect(res.body.message).toBe('Todo not found');
    });
  });

  describe('Delete todo', () => {
    test('DELETE /todos/-1 - should show error when deleting non existing todo', async () => {
      const res = await request(app).delete('/todos/-1');

      expect(res.statusCode).toBe(404);

      expect(typeof res.body).toBe('object');
      expect(typeof res.body.message).toBe('string');
      expect(res.body.message).toBe('Todo not found');
    });
  });
});
