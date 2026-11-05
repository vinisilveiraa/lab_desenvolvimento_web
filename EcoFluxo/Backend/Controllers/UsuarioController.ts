import prisma from "../lib/prisma.js";
import type { Request, Response } from "express";
import { send2FACodeEmail } from "../Services/emailServices.js";


export default class UsuarioController {
    static async Create(req: Request, res: Response) {
        try {
            const { } = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {

        }

    };
    static async Login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha)
                return res.status(404).json({ message: "E-mail e senha são obrigatórios" });

            try {
                const usuario = prisma.usuario.findUnique({
                    where: { email }
                })

                if (!usuario)
                    return res.status(404).json({ message: "Credenciais Inválidas" });

                // IMPORTAR DEPOIS
                const senhaCorreta = await hash.argon2?.verify(usuario.senha == senha);

                if (!senhaCorreta)
                    return res.status(404).json({ message: "Credenciais Inválidas" });

                // gerar codigo 2FA

                const codigoFA = Math.floor(100000 + Math.random() * 900000).toString();
                const expiracao = new Date(Date.now() + 10 * 60 * 1000);

                // atualizar o codigo e tempo no banco de dados
                await prisma.usuario.update({
                    where: { id: usuario.id },
                    data: {
                        loginCode: codigoFA,
                        loginCodeExpires: expiracao
                    }
                });

                // enviar email
                await send2FACodeEmail(usuario.email, codigoFA);

                return res.status(200).json({
                    require2FA: true,
                    message: "Código de verificação enviado para o seu e-mail",
                    email: usuario.email
                });

            } catch (error) {
                return res.status(500).json({ message: "Erro ao buscar usuário", error });
            }


        } catch (error) {

        }

    };
    static async Logout(req: Request, res: Response) {
        try {

        } catch (error) {

        }

    };
    static async Verify2FA(req: Request, res: Response) {
        try {
            const { } = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {

        }

    };
    static async Reset(req: Request, res: Response) {
        try {
            const { } = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {

        }

    };
    static async forgotPassword(req: Request, res: Response) {
        try {
            const { } = req.body;
            //verificação dos dados obrigatórios

            //inserir no banco de dados
        } catch (error) {

        }

    };
}