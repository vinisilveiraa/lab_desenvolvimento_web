import prisma from "../lib/prisma.js";
import type { Request, Response } from "express";

export default class LixeiraController {
    static async Create(req: Request, res: Response) {
        try {
            const {
                uuid_sensor,
                tipo,
                volume_max,
                nivel_cheio,
                ecoponto_id,
            } = req.body;
            //verificação dos dados obrigatórios

            if (!uuid_sensor || !tipo || !volume_max || !nivel_cheio || !ecoponto_id) {
                return res.status(400).json({ message: "Campos inválidos ou não preenchidos" });
            }

            const lixeiraData = {
                uuid_sensor, tipo,
                volume_max: Number(volume_max),
                nivel_cheio: Number(nivel_cheio),
                ecoponto_id: Number(ecoponto_id)
            }

            const novaLixeira = await prisma.lixeira.create({
                data: lixeiraData
            });

            return res.status(201).json({ message: "Lixeira criada com sucesso", novaLixeira });
        } catch (error) {
            return res.status(400).json({ message: "Erro na criação do Lixeira", error });
        }

    }
    static async getLixeiras(req: Request, res: Response) {
        try {
            const lixeiras = await prisma.lixeira.findMany({
                orderBy: { criadoEm: 'desc' },
                include: { notificacoes: true, ecoponto: true }
            })

            return res.status(200).json(lixeiras)
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar Lixeiras', error })
        }

    }
}