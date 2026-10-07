import pool from '../db/postgres.js';

const APIBase = {

    async list() {
        const query = 'SELECT * FROM despesas ORDER BY data DESC;';
        const result = await pool.query(query);
        return result.rows;
    },

    async buscarUser(data) {
        // Adaptado para procurar na tabela de despesas (ex: por descrição)
        const query = 'SELECT * FROM despesas WHERE descricao = $1;';
        const result = await pool.query(query, [data]);
        return result.rows[0];
    },

    async create(data) {
        try {
            const query = `
                INSERT INTO despesas (
                    data, descricao, valor, 
                    entrada_donativo, saida_donativo, 
                    entrada_conta, saida_conta, 
                    entrada_outra_conta, saida_outra_conta
                ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                RETURNING *;
            `;
            
            const values = [
                data.data,
                data.descricao,
                data.valor || 0,
                data.entrada_donativo || 0,
                data.saida_donativo || 0,
                data.entrada_conta || 0,
                data.saida_conta || 0,
                data.entrada_outra_conta || 0,
                data.saida_outra_conta || 0
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao criar despesa:", error);
            throw error;
        }
    },

    async byId(id) {      
        const query = 'SELECT * FROM despesas WHERE id = $1;';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    async updateById(id, data) {
        const query = `
            UPDATE despesas 
            SET data = $1, descricao = $2, valor = $3,
                entrada_donativo = $4, saida_donativo = $5,
                entrada_conta = $6, saida_conta = $7,
                entrada_outra_conta = $8, saida_outra_conta = $9
            WHERE id = $10 
            RETURNING *;
        `;
        
        const values = [
            data.data,
            data.descricao,
            data.valor || 0,
            data.entrada_donativo || 0,
            data.saida_donativo || 0,
            data.entrada_conta || 0,
            data.saida_conta || 0,
            data.entrada_outra_conta || 0,
            data.saida_outra_conta || 0,
            id
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async delItemList(id) {
        const query = 'DELETE FROM despesas WHERE id = $1 RETURNING *;';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

};

export default APIBase;