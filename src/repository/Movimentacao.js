import pool from '../db/postgres.js';

const MovimentacaoBase = {

  async list() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    
    const inicioMes = `${ano}-${mes}-01`;
    const proximoMes = new Date(ano, agora.getMonth() + 1, 1);
    const fimMes = proximoMes.toISOString().split('T')[0];

    const query = `
      SELECT * FROM movimentos 
      WHERE data >= $1 AND data < $2 
      ORDER BY data ASC;
    `;
    const values = [inicioMes, fimMes];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async listPorMes(mesAno) {
    const ano = mesAno.ano;
    const mesStr = String(mesAno.mes).padStart(2, '0');
    
    const inicioMes = `${ano}-${mesStr}-01`;
    
    const proximoAno = mesAno.mes === 12 ? ano + 1 : ano;
    const proximoMesNum = mesAno.mes === 12 ? 1 : mesAno.mes + 1;
    const proximoMesStr = String(proximoMesNum).padStart(2, '0');
    const fimMes = `${proximoAno}-${proximoMesStr}-01`;

    const query = `
      SELECT * FROM movimentos 
      WHERE data >= $1 AND data < $2 
      ORDER BY data ASC;
    `;
    const values = [inicioMes, fimMes];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async create(data) { 
    try {
      const query = `
        INSERT INTO movimentos (
          data, descricao, s, 
          entrada_d, saida_d, 
          entrada_banco, saida_banco, 
          entrada_outra, saida_outra
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
      `;
      
      const values = [
        data.data,
        data.descricao,
        data.s,
        data.donativos?.entrada_d || 0,
        data.donativos?.saida_d || 0,
        data.conta_bancaria?.entrada || 0,
        data.conta_bancaria?.saida || 0,
        data.outra?.entrada || 0,
        data.outra?.saida || 0
      ];

      const result = await pool.query(query, values);
      return result.rows[0];

    } catch (error) {
      console.error("Erro ao salvar movimentação:", error);
      throw error;
    }
  },

  async upById(id, data) {
    const query = `
      UPDATE movimentos 
      SET data = $1, descricao = $2, s = $3,
          entrada_d = $4, saida_d = $5,
          entrada_banco = $6, saida_banco = $7,
          entrada_outra = $8, saida_outra = $9
      WHERE id = $10 
      RETURNING *;
    `;
    
    const values = [
      data.data,
      data.descricao,
      data.s,
      data.donativos?.entrada_d || 0,
      data.donativos?.saida_d || 0,
      data.conta_bancaria?.entrada || 0,
      data.conta_bancaria?.saida || 0,
      data.outra?.entrada || 0,
      data.outra?.saida || 0,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deletarMovItem(id) { 
    const query = 'DELETE FROM movimentos WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

};

export default MovimentacaoBase;