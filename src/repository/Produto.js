import mongoose from "../db/mongoose.js";
import schema from '../schema/usuario.js';
import bcryptHash from '../util/bcryptPassWord.js'

const model = mongoose.model('Produto', schema);

const ProdutoBase={

     list(){
        const query={};
        return model.find()
    },

    

}

export default ProdutoBase