import Joi from "joi";

export const userValidation = {
  login: {
    body: {
      email: Joi.string(),
      password: Joi.string(),
    },
  },
  register: {
    body: {
      email: Joi.string(),
      password: Joi.string(),
      phone: Joi.string(),
    },
  },
};
