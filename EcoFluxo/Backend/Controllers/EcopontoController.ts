import prisma from "../lib/prisma.js";
import type { Request, Response } from "express";

export default class EcopontoController {
    static async Create(req: Request, res: Response) {
        try {
            const {
                nome,
                latitude,
                longitude,
                descricao,
                cep,
                logradouro,
                numero,
                bairro,
                cidade,
                uf
            } = req.body;
            //verificação dos dados obrigatórios

            if (!nome || latitude || longitude) {
                return res.status(400).json({ message: "Campos inválidos ou não preenchidos" });
            }

            const ecopontoData = {
                nome,
                latitude,
                longitude,
                descricao: descricao || null,
                cep: logradouro || null,
                logradouro: logradouro || null,
                numero: numero || null,
                bairro: bairro || null,
                cidade: cidade || null,
                uf: uf || null
            }

            const novoEcoponto = await prisma.ecoponto.create({
                data: ecopontoData,
            });

            return res.status(201).json({ message: "Ecoponto criado com sucesso", novoEcoponto });
        } catch (error) {
            return res.status(400).json({ message: "Erro na criação do Ecoponto", error });
        }

    }
    static async getEcopontos(req: Request, res: Response) {
        try {
            const ecopontos = await prisma.ecoponto.findMany({
                orderBy: { criadoEm: 'desc' },
                include: { lixeiras: true }
            })

            return res.status(200).json(ecopontos)
        } catch (error) {
            return res.status(400).json({ message: 'Erro ao buscar Ecopontos', error })
        }

    }
}