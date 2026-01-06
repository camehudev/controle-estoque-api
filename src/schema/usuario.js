import mongoose from "mongoose";

const {Schema} = mongoose;
const Usuario = new Schema({
    userName: String,
    passUser:String,
    tipoUser:String

})

export default Usuario