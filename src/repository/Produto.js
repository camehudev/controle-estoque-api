import pool from '../db/postgres.js';

export default {
  async list() {
    const result = await pool.query('SELECT * FROM produtos');
    return result.rows;
  },

  async byId(id) {
    const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(data) {
    const query = `
      INSERT INTO produtos (nome, quantidade, preco) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [data.nome, data.quantidade, data.preco];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};