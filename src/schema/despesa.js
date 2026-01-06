import mongoose from "mongoose";

const {Schema} = mongoose;
const Despesa = new Schema({
    data: String,
    descricao:String,
    valor:String,   
    entrada_donativo: String,
    saida_donativo:String,
    entrada_conta:String,
    saida_conta:String,
    entrada_outra_conta: String,
    saida_outra_conta: String

})

export default Despesa