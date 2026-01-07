import mongoose from "mongoose";

const {Schema} = mongoose;
const Produtos = new Schema({
    nome: String,
    categoria: String,
    tipoVenda: Number,
    preco: Number,
    estoqueAtual: Number,
    estoqueMinimo: Number

})
