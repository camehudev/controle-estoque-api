import pool from '../db/postgres.js';

const ResumoBase = {

  async list() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    
    // Primeiro e último dia do mês atual no formato YYYY-MM-DD
    const inicioMes = `${ano}-${mes}-01`;
    const proximoMes = new Date(ano, agora.getMonth() + 1, 1);
    const fimMes = proximoMes.toISOString().split('T')[0];

    const query = `
      SELECT * FROM resumos 
      WHERE data >= $1 AND data < $2 
      ORDER BY data ASC;
    `;
    const values = [inicioMes, fimMes];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async listPorMes(mesAno) {
    // mesAno esperado como { ano: 2026, mes: 10 } por exemplo
    const ano = mesAno.ano;
    const mesStr = String(mesAno.mes).padStart(2, '0');
    
    const inicioMes = `${ano}-${mesStr}-01`;
    
    // Calcula o próximo mês para o limite superior (exclusivo)
    const proximoAno = mesAno.mes === 12 ? ano + 1 : ano;
    const proximoMesNum = mesAno.mes === 12 ? 1 : mesAno.mes + 1;
    const proximoMesStr = String(proximoMesNum).padStart(2, '0');
    const fimMes = `${proximoAno}-${proximoMesStr}-01`;

    const query = `
      SELECT * FROM resumos 
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
        INSERT INTO resumos (
          data, entrada_d, saida_d, total_donativos, 
          entrada_banco, saida_banco, total_banco, 
          entrada_outra, saida_outra, total_outra
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *;
      `;
      
      const values = [
        data.data,
        data.donativos?.entrada_d || 0,
        data.donativos?.saida_d || 0,
        data.donativos?.total || 0,
        data.conta_bancaria_cofre?.entrada || 0,
        data.conta_bancaria_cofre?.saida || 0,
        data.conta_bancaria_cofre?.total || 0,
        data.outra?.entrada || 0,
        data.outra?.saida || 0,
        data.outra?.total || 0
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
      UPDATE resumos 
      SET data = $1, entrada_d = $2, saida_d = $3, total_donativos = $4,
          entrada_banco = $5, saida_banco = $6, total_banco = $7,
          entrada_outra = $8, saida_outra = $9, total_outra = $10
      WHERE id = $11 
      RETURNING *;
    `;
    
    const values = [
      data.data,
      data.donativos?.entrada_d || 0,
      data.donativos?.saida_d || 0,
      data.donativos?.total || 0,
      data.conta_bancaria_cofre?.entrada || 0,
      data.conta_bancaria_cofre?.saida || 0,
      data.conta_bancaria_cofre?.total || 0,
      data.outra?.entrada || 0,
      data.outra?.saida || 0,
      data.outra?.total || 0,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deletarMovItem(id) { 
    const query = 'DELETE FROM resumos WHERE id = $1 RETURNING *;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

};

export default ResumoBase;