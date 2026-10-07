import pool from '../db/postgres.js'; // Ajuste o caminho para a sua conexão do postgres
import bcryptHash from '../util/bcryptPassWord.js';

export default {
  async list() {
    const result = await pool.query('SELECT id, userName, email, tipoUser, created_at FROM usuarios');
    return result.rows;
  },

  async buscarUser(userName) {
    const result = await pool.query('SELECT * FROM usuarios WHERE userName = $1', [userName]);
    return result.rows[0];
  },

  async create(data) {
    try {
      const hash = await bcryptHash.gerarHash(data.passUser);
      const query = `
        INSERT INTO usuarios (userName, email, passUser, tipoUser) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, userName, email, tipoUser, created_at;
      `;
      const values = [data.userName, data.email, hash, data.tipoUser];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async byId(id) {
    const result = await pool.query('SELECT id, userName, email, tipoUser, created_at FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  },

  async updateById(id, data) {
    const query = `
      UPDATE usuarios 
      SET userName = $1, email = $2, tipoUser = $3 
      WHERE id = $4 
      RETURNING id, userName, email, tipoUser, created_at;
    `;
    const values = [data.userName, data.email, data.tipoUser, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};