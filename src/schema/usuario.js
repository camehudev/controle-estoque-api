// src/schema/usuario.js
export const usuarioSchema = {
  tableName: 'usuarios',
  fields: {
    userName: 'VARCHAR(255) NOT NULL',
    email: 'VARCHAR(255) UNIQUE NOT NULL',
    passUser: 'VARCHAR(255) NOT NULL',
    tipoUser: 'VARCHAR(50) NOT NULL'
  }
};