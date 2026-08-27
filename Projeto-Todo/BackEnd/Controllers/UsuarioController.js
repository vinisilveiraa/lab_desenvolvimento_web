import Usuario from "../Models/Usuario.js";
import { hash, verify } from "@node-rs/argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_super_secreta";
const JWT_EXPIRATION_MS = 60 * 60 * 1000 // 1hora

export default class UsuarioController {
    static async Create(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(422).json({ message: "Todos os dados são obrigatórios" });
        }

        try {
            const hashPassword = await hash(senha);

            const usuario = new Usuario({
                nome, email, senha: hashPassword
            });

            const novoUsuario = await usuario.save();
            res.status(200).json({ message: "Usuario inserido com sucesso", novoUsuario });

            return;

        } catch (error) {
            return res.status(500).json({ message: "Problema ao inserir usuario ", error });
        }
    }

    static async Login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(422).json({ message: "Todos os dados são obrigatórios" });
            }

            const usuario = await Usuario.findOne({ email }).select('+senha') // procura pelo email e exclui a senha

            if (!usuario)
                return res.status(400).json({ message: 'Credenciais inválidas' });

            const senhaValida = await verify(usuario.senha, senha);

            if (!senhaValida)
                return res.status(400).json({ message: 'Credenciais inválidas' });

            const tokenPayload = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            };

            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" })
            res.cookie("token", token, {
                httpOnly: true, // evita acesso por script js
                secure: false, // tornar true em produção, exige https
                sameSite: "lax", // comunicação entre front e back
                maxAge: JWT_EXPIRATION_MS || 3600000 // 1 hora
            });

            res.status(200).json({
                message: "Login efetuado com sucesso",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                },
                token
            });
        } catch (error) {
            return res.status(500).json({ message: "Problema ao inserir usuario ", error });
        }

    }//fim create
}