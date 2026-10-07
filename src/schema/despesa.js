// src/schema/despesa.js
export const despesaSchema = {
  tableName: 'despesas',
  fields: {
    data: 'DATE NOT NULL',
    descricao: 'VARCHAR(255) NOT NULL',
    valor: 'NUMERIC(10, 2)',
    entrada_donativo: 'NUMERIC(10, 2)',
    saida_donativo: 'NUMERIC(10, 2)',
    entrada_conta: 'NUMERIC(10, 2)',
    saida_conta: 'NUMERIC(10, 2)',
    entrada_outra_conta: 'NUMERIC(10, 2)',
    saida_outra_conta: 'NUMERIC(10, 2)'
  }
};