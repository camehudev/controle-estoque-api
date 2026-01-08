import mongoose from "../db/mongoose.js";
import schema from '../schema/usuario.js';
import bcryptHash from '../util/bcryptPassWord.js'

const model = mongoose.model('Usuario', schema)

const UsuarioBase={

    list(){
        const query={};
        return model.find()
    },

    async buscarUser(data){     
      return await model.findOne({userName: data});      
    },

    async create(data) {
      try {
        const hash = await bcryptHash.gerarHash(data.passUser);
    
        const objData = {
          userName: data.userName,
          passUser: hash,
          tipoUser: data.tipoUser
        };
    
        const usuario = new model(objData);
        return await usuario.save(); // retorna a Promise da criação
      } catch (error) {
        
        // Aqui você pode lançar o erro, logar, ou retornar algo mais útil
        throw error; // ou return { error: error.message };
      }
    },

  async byId(id) { 
      return await model.findById({_id: id})     
  },

    updateById(id, data){
      return model.updateOne({_id:id}, data)

    },

    delItemList(id){
        return model.deleteOne({_id:id})

    }
}

export default UsuarioBase