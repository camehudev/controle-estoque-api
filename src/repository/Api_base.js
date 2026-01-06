import mongoose from "../db/mongoose.js";
import schema from '../schema/despesa.js';

const model = mongoose.model('Despesa', schema)

const APIBase={

    list(){
        const query={};
        return model.find(query)
    },

    buscarUser(data){
       return model.findOne({userName: data})
    },

    create(data){
      const despesa = new model(data);
      return despesa.save();
    },

    async byId(id) {      
      return await model.findOne({ _id:id });
  },

  

    updateById(id, data){
      return model.updateOne({_id:id}, data);

    },

    delItemList(id){
        return model.deleteOne({_id:id})

    }
}

export default APIBase