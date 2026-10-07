// src/schema/movimento.js
export const movimentoSchema = {
  tableName: 'movimentos',
  fields: {
    data: 'DATE NOT NULL',
    descricao: 'VARCHAR(255) NOT NULL',
    s: 'VARCHAR(50) NOT NULL',
    entrada_d: 'NUMERIC(10, 2)',
    saida_d: 'NUMERIC(10, 2)',
    entrada_banco: 'NUMERIC(10, 2)',
    saida_banco: 'NUMERIC(10, 2)',
    entrada_outra: 'NUMERIC(10, 2)',
    saida_outra: 'NUMERIC(10, 2)'
  }
};