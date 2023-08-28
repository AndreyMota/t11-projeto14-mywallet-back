import Joi from "joi";

const validaTrasassao = Joi.object({
    descricao: Joi.string().required(),
    valor: Joi.number().required(),
    tipo: Joi.string().valid("entrada", "saida").required()
});

export async function validaTrasacao(req, res, next) {
    const { descricao, valor } = req.body;
    if (typeof(valor) != "number") {
        return res.status(422).send(`"valor" deve ser numerico`);
    }
    const tipo = req.params.tipo;

    const { error } = validaTrasassao.validate({ descricao, valor, tipo });
    
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}