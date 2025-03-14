const pool = require("../configs/db");

describe('CD Controller - Integration Tests', () => {
  // Test data
  const testCDs = [
    { title: 'Test Album 1', artist: 'Test Artist 1', year: 2020 },
    { title: 'Test Album 2', artist: 'Test Artist 2', year: 2021 }
  ];

  // Before all tests, insert test data
  beforeAll(async () => {
    // Clear the table first
    await pool.query('DELETE FROM cds');
    
    // Insert test data
    for (const cd of testCDs) {
      await pool.query(
        'INSERT INTO cds (title, artist, year) VALUES ($1, $2, $3)',
        [cd.title, cd.artist, cd.year]
      );
    }
  });

  // After all tests, clean up
  afterAll(async () => {
    await pool.query('DELETE FROM cds');
    await pool.end();
  });

  describe('getAllCDs', () => {
    it('should return all CDs in the database', async () => {
      // Make the query directly to the database
      const result = await pool.query('SELECT * FROM cds ORDER BY id ASC');
      const cds = result.rows;

      // Jest assertions
      expect(Array.isArray(cds)).toBe(true);
      expect(cds).toHaveLength(2);
      expect(cds[0]).toMatchObject({
        title: 'Test Album 1',
        artist: 'Test Artist 1',
        year: 2020
      });
      expect(cds[1]).toMatchObject({
        title: 'Test Album 2',
        artist: 'Test Artist 2',
        year: 2021
      });
    });
  });

  
});
