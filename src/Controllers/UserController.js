import { db } from "../database.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid"

export async function signUp(req, res) {
    const { nome, email, senha } = req.body;
    try {
        const emailCadastrado = await db.collection("users").findOne({ email });
        if (emailCadastrado) {
            return res.status(409).send('Email já registrado!');
        }
        const senhacrip = bcrypt.hashSync(senha, 4);
        await db.collection("users").insertOne({ nome, email, senha: senhacrip, ops: [] }); 
        /* ops: [
            {valor: 0.00, tipo: entrada/saida } #entrada: numero positivo/ saido: numero negativo
        ] */
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send("Algo de errado não está certo");
    }
}

export async function signIn(req, res) {
    const { email, senha } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).send("Email não registrado!");
        }
        const senhacerta = bcrypt.compareSync(senha, user.senha);
        if (!senhacerta) {
            return res.status(401).send("Senha incorreta.");
        }
        const token = uuid();
        await db.collection("sessions").insertOne({ userId: new ObjectId(user._id), token });
        res.json({ token: token });
    } catch (error) {
        res.status(500).send("Algo de errado não está certo");
    }
}

export async function getUsers(req, res) {
    try {
        const users = await db.collection("users").find().toArray();
        res.send(users);   
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getUser(req, res) {
    try {
        const user = await db.collection("users").findOne(req.userId);
        res.send(user);
    } catch (error) {
        res.sendStatus(500);
    }
}