import bcrypt from 'bcrypt'


const bcryptHash = {

    async gerarHash(senha) {
        const saltRounds = 10;
      
        try {
          const hash = await bcrypt.hash(senha, saltRounds);
            return hash;

        } catch (err) {
            throw err;
        }
      },

    
    async compareHash(senha, hashSalvoNoBanco) {
        try {
          const resultado = await bcrypt.compare(senha, hashSalvoNoBanco);
          return resultado;
        } catch (error) {
          console.error('Erro ao comparar senhas:', error);
          throw error;
        }
      }
      

}

export default bcryptHash

