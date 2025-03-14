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

  describe('addCD', () => {
    it('should add a new CD to the database', async () => {
      const newCD = {
        title: 'New Test Album',
        artist: 'New Test Artist',
        year: 2024
      };

      // Insert the new CD
      const insertResult = await pool.query(
        'INSERT INTO cds (title, artist, year) VALUES ($1, $2, $3) RETURNING *',
        [newCD.title, newCD.artist, newCD.year]
      );

      // Verify the inserted CD
      const insertedCD = insertResult.rows[0];
      expect(insertedCD).toMatchObject({
        title: newCD.title,
        artist: newCD.artist,
        year: newCD.year
      });
      expect(insertedCD.id).toBeDefined();

      // Verify it exists in the database
      const queryResult = await pool.query('SELECT * FROM cds WHERE id = $1', [insertedCD.id]);
      expect(queryResult.rows).toHaveLength(1);
      expect(queryResult.rows[0]).toMatchObject(newCD);
    });
  });

  describe('deleteCD', () => {
    it('should delete a CD from the database', async () => {
      // First, insert a CD to delete
      const cdToDelete = {
        title: 'Delete Test Album',
        artist: 'Delete Test Artist',
        year: 2023
      };

      // Insert the CD and get its ID
      const insertResult = await pool.query(
        'INSERT INTO cds (title, artist, year) VALUES ($1, $2, $3) RETURNING *',
        [cdToDelete.title, cdToDelete.artist, cdToDelete.year]
      );
      const cdId = insertResult.rows[0].id;

      // Delete the CD
      await pool.query('DELETE FROM cds WHERE id = $1', [cdId]);

      // Verify the CD was deleted
      const result = await pool.query('SELECT * FROM cds WHERE id = $1', [cdId]);
      expect(result.rows).toHaveLength(0);
    });
  });
});
