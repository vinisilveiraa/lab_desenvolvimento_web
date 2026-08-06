import Tarefa from "../Models/Tarefa";
import { Types } from "mongoose";

export default class TarefaController {
    static async Create(req, res) {
        const { titulo, descricao, dataLimite, situacao } = req.body;

        if (!titulo || !descricao || dataLimite || situacao) {
            return res.status(422).json({ message: "Todos os dados sao obrigatorios" })
        };
        try {
            const tarefa = new Tarefa({
                titulo, descricao, dataLimite, situacao
            });

            const novaTarefa = await tarefa.save();
            res.status(200).json({ message: "Tarefa inserida com sucesso", novaTarefa });
            return;

        } catch (error) {
            return res.status(400).json({ message: "Erro ao inserir uma tarefa", error })

        }
    }
}