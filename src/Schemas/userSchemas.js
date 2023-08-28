import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    nome: Joi.string().required(),
    senha: Joi.string().min(3).required()
});

const signInSchema = Joi.object({
    email: Joi.string().required(),
    senha: Joi.string().min(3).required()
})

export function validaBodySignup(req, res, next) {
    const { email, nome, senha } = req.body;

    const { error } = signUpSchema.validate({ email, nome, senha });
    
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    next()
}

export function validaBodySignIn(req, res, next) {
    const { email, senha } = req.body;

    const { error } = signInSchema.validate({ email, senha });
    
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    next();
}