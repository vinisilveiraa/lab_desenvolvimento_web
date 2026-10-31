import { now } from "mongoose";
import mongoose from "../db/conn.js";
const { Schema } = mongoose;


const doacaoSchema = new Schema({
    tipoItem: {
        type: String,
        required: true,
        trim: true
    },
    quantidade: {
        type: Number,
        required: true,
    },
    doador: {
        type: String,
        required: true,
        trim: true
    },
    dataDoacao: {
        type: Date,
        default: Date.now(),
        required: false
    },
    status: {
        type: String,
        default: "disponivel",
        trim: true,
        required: false
    },
}, { timestamps: true });

const Doacao = mongoose.model('Doacao', doacaoSchema);
export default Doacao;