import Doacao from "../Models/Doacao.js";

export default class DoacaoController {

    // para facilitar testes
    static async getAll(req, res) {
        try {
            const doacoes = await Doacao.find({});

            if (doacoes.length === 0) {
                return res.status(404).json({ message: "Não há doações cadastradas" });
            }

            return res.status(200).json({ message: "Doações retornados com sucesso", doacoes });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar doações", error })
        }
    }

    static async Create(req, res) {
        const { tipoItem, quantidade, doador } = req.body;

        if (!tipoItem || !Number(quantidade) || !doador) {
            return req.status(400).json({ message: "Campos inválidos" });
        }

        // para facilitar buscas depois
        const formattedItem = tipoItem
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

        try {
            const doacao = new Doacao({
                tipoItem: formattedItem, quantidade, doador
            });
            // a data ja e definida pela model

            const newDoacao = await doacao.save();

            return res.status(201).json({ message: "Doação inserida com sucesso", newDoacao });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao inserir doação", error });
        }
    }

    static async getByTipo(req, res) {
        const { tipoItem } = req.query;

        if (!tipoItem) {
            return res.status(400).json({ message: "O tipo do item deve ser informado" });
        }

        const formattedItem = tipoItem
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

        try {
            const itens = await Doacao.find({ tipoItem: formattedItem });

            if (itens.length === 0) {
                return res.status(200).json({ message: `Não há itens cadastrados com o tipo '${formattedItem.toUpperCase()}'` });
            }

            return res.status(200).json({ message: `Itens de tipo '${formattedItem.toUpperCase()}' retornados com sucesso`, itens });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar Itens", error })
        }
    }

    static async updateQuantidade(req, res) {
        const { id } = req.params
        const { quantidade } = req.body

        if (!id || !quantidade) {
            return res.status(400).json({ message: "Campos inválidos" });
        }

        try {
            const doacao = await Doacao.findById(id);

            if (!doacao) {
                return res.status(404).json({ message: "Doação não encontrada" });
            }

            if (doacao.status !== 'disponivel') {
                return res.status(409).json({ message: "Doação já distribuída (indisponível)" });
            }

            const dadosAtualizados = {};
            dadosAtualizados.quantidade = quantidade;

            const newDoacao = await Doacao.findOneAndUpdate(
                { _id: id, status: 'disponivel' },
                { $set: dadosAtualizados },
                { returnDocument: 'after', runValidators: true }
            );

            if (!newDoacao) {
                return res.status(404).json({ message: "Doação não cadastrado ou não disponível" });
            }

            return res.status(200).json({ message: "Quantia atualizada com sucesso", newDoacao });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar quantidade", error })
        }
    }

    static async updateStatus(req, res) {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ message: "Campos inválidos" });
        }

        try {
            const doacao = await Doacao.findById(id);

            if (!doacao) {
                return res.status(404).json({ message: "Doação não encontrada" });
            }

            if (doacao.status !== 'disponivel') {
                return res.status(409).json({ message: "Doação já distribuída (indisponível)" });
            }

            const dadosAtualizados = {};
            dadosAtualizados.status = 'distribuido';

            const newDoacao = await Doacao.findOneAndUpdate(
                { _id: id, status: 'disponivel' },
                { $set: dadosAtualizados },
                { returnDocument: 'after', runValidators: true }
            );

            if (!newDoacao) {
                return res.status(404).json({ message: "Doação não cadastrado ou não disponível" });
            }

            return res.status(200).json({ message: "Status atualizado com sucesso", newDoacao });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar status", error })
        }

    }
}