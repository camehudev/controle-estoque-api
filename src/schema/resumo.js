import mongoose from "mongoose";

  const {Schema} = mongoose;
  const ResumoSchema = new Schema({
    data: { type: Date, required: true },    
    donativos: {
      entrada_d: { type: String, default: null },
      saida_d: { type: String, default: null },
      total: { type: String, default: null }
    },
    conta_bancaria_cofre: {
      entrada: { type: String, default: null },
      saida: { type: String, default: null },
      total: { type: String, default: null },
    },
    outra: {
      entrada: { type: String, default: null },
      saida: { type: String, default: null },
      total: { type: String, default: null }
    }
  
  })
  
  export default ResumoSchema