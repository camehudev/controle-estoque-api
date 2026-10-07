import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

// Cria a pool de conexões usando a string do ficheiro .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Se a sua VPS/PostgreSQL exigir SSL, descomente a linha abaixo:
  // ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Conectado ao PostgreSQL com sucesso!');
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente PostgreSQL', err);
  process.exit(-1);
});

export default {
  query: (text, params) => pool.query(text, params),
};