const request = require('supertest');
const app = require('../server');

describe('CD Routes', () => {
  describe('GET /cds', () => {
    it('should get all CDs', async () => {
      const response = await request(app)
        .get('/api/cds')
        .expect(200)
        .expect('Content-Type', /json/);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
