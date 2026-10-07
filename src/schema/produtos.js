// src/schema/produto.js
export const produtoSchema = {
  tableName: 'produtos',
  fields: {
    nome: 'VARCHAR(255) NOT NULL',
    categoria: 'VARCHAR(100) NOT NULL',
    tipoVenda: 'INT NOT NULL',
    preco: 'NUMERIC(10, 2) NOT NULL',
    estoqueAtual: 'INT NOT NULL DEFAULT 0',
    estoqueMinimo: 'INT NOT NULL DEFAULT 0'
  }
};