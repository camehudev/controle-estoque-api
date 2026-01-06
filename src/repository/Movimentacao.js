import mongoose from "../db/mongoose.js";
import schema from '../schema/movimentacao.js';


const model = mongoose.model('MovimentoSchema', schema)

const MovimentacaoBase={

async list() {
    const agora = new Date();

    // Início do mês atual
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);

    // Início do próximo mês
    const inicioProximoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 1);

    // Consulta com filtro por intervalo de datas
    return await model.find({
      data: { $gte: inicioMes, $lt: inicioProximoMes }
    }).sort({ data: 1 });
},

async listPorMes(mesAno) {

  // No JS os meses vão de 0 a 11, por isso -1
  const inicioMes = new Date(mesAno.ano, mesAno.mes - 1, 1);
  const inicioProximoMes = new Date(mesAno.ano, mesAno.mes, 1);

  return await model.find({
    data: { $gte: inicioMes, $lt: inicioProximoMes }
  }).sort({ data: 1 });
},


async create(data) { 
  try {

    const movimento = new model(data);    
    return await movimento.save();

  } catch (error) {

    console.error("Erro ao salvar movimentação:", error);
    throw error; // propaga o erro para o controller
    
  }
},

async upById(id, data) {
  return await model.findByIdAndUpdate(id, data, { new: true });
},


  deletarMovItem(id){ 
      return model.deleteOne({_id:id})
},


}



export default MovimentacaoBase