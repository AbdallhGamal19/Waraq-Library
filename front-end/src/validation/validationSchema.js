import Joi from "joi";

const sginUp = Joi.object({
  userName: Joi.string().min(3).max(15).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required()
    .label("password"),
  phone: Joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/),
}).required();
const logIn = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required()
    .label("password"),
}).required();
export { sginUp, logIn };
