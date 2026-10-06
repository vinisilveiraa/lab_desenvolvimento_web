import Tarefa from "../Models/Tarefa.js";
import { Types } from "mongoose";

export default class TarefaController {

    static async Create(req, res) {
        const { titulo, descricao, dataLimite, situacao, participam } = req.body;
        const usuarioLogado = req.user.id;
        if (!titulo || !descricao || !dataLimite || !situacao) {
            return res.status(422).json({ message: "Todos os dados são obrigatórios" });
        }
        try {
            const tarefa = new Tarefa({
                titulo,
                descricao,
                dataLimite,
                situacao,
                criadoPor: usuarioLogado,
                participam: Array.isArray(participam) ? participam : (participam ? [participam] : [])
            });
            const novaTarefa = await tarefa.save();
            const tarefaPopulada = await Tarefa.findById(novaTarefa._Id)
                .populate("criadoPor", "nome email")
                .populate("participam", "nome email")
            res.status(200).json({ message: "Tarefa inserida com sucesso", novaTarefa: tarefaPopulada });
            return;
        } catch (error) {
            return res.status(500).json({ message: "Problema ao inserir uma tarefa", error });
        }
    }//fim create

    static async getAll(req, res) {
        const usuarioLogado = req.user.id;
        // console.log(req.user)
        try {
            const tarefas = await Tarefa.find(
                {
                    $or: [
                        { criadoPor: usuarioLogado },
                        { participam: usuarioLogado }
                    ]
                }
            )
                .populate("criadoPor", "nome")
                .populate("participam", "nome")
                .sort({ createdAt: -1 });
            return res.status(200).json({ message: "Buscar tarefas com sucesso", tarefas });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar todas tarefas", error });
        }

    }//fim getAll

    static async changeStatus(req, res) {
        const { id, situacao } = req.body;

        if (!id || !situacao) {
            return res.status(422).json({ message: "ID e situação da tarefa são obrigatórios" });
        }

        const validStatuses = ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"];

        if (!validStatuses.includes(situacao)) {
            return res.status(422).json({ message: "Situação da tarefa inválida" });
        }

        try {
            const tarefa = await Tarefa.findById(id);

            if (!tarefa) {
                return res.status(404).json({ message: "Tarefa não encontrada" });
            }

            tarefa.situacao = situacao;

            await tarefa.save();

            return res.status(200).json({
                message: "Status da tarefa atualizado com sucesso",
                tarefa
            });

        } catch (error) {
            if (error.kind === 'ObjectId' || error.name === 'CastError') {
                return res.status(400).json({ message: "ID fornecido possui um formato inválido" });
            }

            return res.status(500).json({
                message: "Erro ao atualizar o status da tarefa",
                error: error.message
            });
        }
    }
}