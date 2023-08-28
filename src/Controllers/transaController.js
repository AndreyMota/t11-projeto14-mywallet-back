import { ObjectId } from "mongodb";
import { db } from "../database.js";
import { json } from "express";

function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Formata o dia com dois dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0'); // O mês começa a partir de 0 (janeiro é 0)

    return `${day}/${month}`;
};


export async function transaSSAO(req, res) {
    const { descricao, valor } = req.body;
    const tipo = req.params.tipo;
    const aid = req.userId;
    const hoje = getFormattedDate();
    /* res.status(200).send(` id: ${aid} , taipe: ${tipo}`); */
    try {
        const newOperation = {
            dia: hoje,
            descricao,
            valor,
            tipo
        };

        await db.collection("users").updateOne({ _id: aid }, { $push: { ops: newOperation }}, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar operação:', err);
                return res.status(500).json({ message: 'Erro interno do servidor' });
            }
            
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
    
        });
        
        res.status(201).json({ message: 'Operação adicionada com sucesso' });

    } catch (error) {
        console.error('Erro ao adicionar operação:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export async function ListaOperacoes(req, res) {
    const aid = new ObjectId(req.userId);
    try {
        const user = await db.collection("users").findOne({ _id: aid });
        if (user) return res.status(200).send(user.ops);
        else return res.status(404).send('Usuario não encontrado');
        

    } catch (error) {
        console.error('Erro ao buscar operações: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}