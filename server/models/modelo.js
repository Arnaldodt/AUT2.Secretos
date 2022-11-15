const mongoose = require('mongoose');
const Schema = mongoose.Schema

const esquemaUsr = new mongoose.Schema({
    nombre: {type:String,required:[true,'campo requerido']},
    apellido: {type:String,required:[true,'campo requerido']},
    correo: {type:String,required:[true,'campo requerido'],unique:true},
    pwd: {type:String,required:[true,'campo requerido']},
    cumpleannos: {type:Date,required:[true,'campo requerido']}
},{timestamps:true})
const Usuario = mongoose.model('esq_Usua', esquemaUsr);

const esquemaSecretos = new mongoose.Schema({
    secreto: {type:String,required:[true,'campo requerido'],maxlength:100},
    id_usu : {
        type: Schema.Types.ObjectId,
        ref: 'esq_Usua',
        required: true
    }
})
const Secreto = mongoose.model('esq_Secret', esquemaSecretos);

const esquemaComentarios = new mongoose.Schema({
    comentario: {type:String,required:[true,'campo requerido'],maxlength:100},
    id_sec : {
        type: Schema.Types.ObjectId,
        ref: 'esq_Secret',
        required: true
    }
})
const Comentario = mongoose.model('esq_Coment', esquemaComentarios);

module.exports = {Usuario,Secreto,Comentario};