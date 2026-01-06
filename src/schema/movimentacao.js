import mongoose from "mongoose";

  const {Schema} = mongoose;
  const MovimentoSchema = new Schema({
    data: { type: Date, required: true },
    descricao: { type: String, required: true },
    s: { type: String, required: true },
    donativos: {
      entrada_d: { type: String, default: null },
      saida_d: { type: String, default: null }
    },
    conta_bancaria: {
      entrada: { type: String, default: null },
      saida: { type: String, default: null }
    },
    outra: {
      entrada: { type: String, default: null },
      saida: { type: String, default: null }
    }
  
  })
  
  export default MovimentoSchema