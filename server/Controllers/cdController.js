const pool = require("../configs/db");

// Récupérer tous les CD
exports.getAllCDs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cds ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un CD
exports.addCD = async (req, res) => {
  const { title, artist, year } = req.body;
  try {
    if (!title || !artist || !year) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await pool.query(
      "INSERT INTO cds (title, artist, year) VALUES ($1, $2, $3) RETURNING *",
      [title, artist, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un CD
exports.deleteCD = async (req, res) => {
  const { id } = req.params;
  try {
    // Verify CD exists before deleting
    const result = await pool.query("SELECT * FROM cds WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(500).json({ error: "CD not found" });
    }
    await pool.query("DELETE FROM cds WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};