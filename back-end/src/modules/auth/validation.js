import joi from "joi";

const sginUp = joi
  .object({
    userName: joi.string().min(3).max(15).required(),
    email: joi.string().email().lowercase().required(),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .required(),
    phone: joi.string().pattern(/^01[0-2,5]{1}[0-9]{8}$/),
  })
  .required();
const logIn = joi
  .object({
    email: joi.string().email().lowercase().required(),
    password: joi
      .string()
      .pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)
      .required(),
  })
  .required();

export { sginUp, logIn };
