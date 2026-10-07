// src/schema/resumo.js
export const resumoSchema = {
  tableName: 'resumos',
  fields: {
    data: 'DATE NOT NULL',
    entrada_d: 'NUMERIC(10, 2)',
    saida_d: 'NUMERIC(10, 2)',
    total_donativos: 'NUMERIC(10, 2)',
    entrada_banco: 'NUMERIC(10, 2)',
    saida_banco: 'NUMERIC(10, 2)',
    total_banco: 'NUMERIC(10, 2)',
    entrada_outra: 'NUMERIC(10, 2)',
    saida_outra: 'NUMERIC(10, 2)',
    total_outra: 'NUMERIC(10, 2)'
  }
};