const request = require('supertest');
const app = require('../server');

describe('CD Routes', () => {
  describe('POST /cds', () => {
    it('should create a new CD with valid data', async () => {
      const newCD = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 2024
      };

      const response = await request(app)
        .post('/api/cds')
        .send(newCD)
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body).toMatchObject(newCD);
      expect(response.body.id).toBeDefined();
    });

    it('should return 500 when required fields are missing', async () => {
      const invalidCD = {
        title: 'Test Album'
        // missing artist and year
      };

      await request(app)
        .post('/api/cds')
        .send(invalidCD)
        .expect(400);
    });

    it('should return 500 when year is not a number', async () => {
      const invalidCD = {
        title: 'Test Album',
        artist: 'Test Artist',
        year: 'not a number'
      };

      await request(app)
        .post('/api/cds')
        .send(invalidCD)
        .expect(500);
    });
  });

  describe('GET /cds', () => {
    it('should get all CDs', async () => {
      const response = await request(app)
        .get('/api/cds')
        .expect(200)
        .expect('Content-Type', /json/);
      
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('artist'); 
      expect(response.body[0]).toHaveProperty('year');
    });
  });

  describe('DELETE /cds/:id', () => {
    let cdIdToDelete;

    beforeEach(async () => {
      // Create a CD to delete
      const newCD = {
        title: 'Album to Delete',
        artist: 'Artist to Delete',
        year: 2024
      };

      const response = await request(app)
        .post('/api/cds')
        .send(newCD);

      cdIdToDelete = response.body.id;
    });

    it('should delete an existing CD', async () => {
      await request(app)
        .delete(`/api/cds/${cdIdToDelete}`)
        .expect(204);

      // Verify the CD was deleted by trying to get it
      const response = await request(app)
        .get('/api/cds');
      
      const deletedCD = response.body.find(cd => cd.id === cdIdToDelete);
      expect(deletedCD).toBeUndefined();
    });

    it('should return 500 when trying to delete a non-existent CD', async () => {
      const nonExistentId = 99999;
      
      await request(app)
        .delete(`/api/cds/${nonExistentId}`)
        .expect(500);
    });
  });
});
