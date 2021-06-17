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
  Logout: {},
  setting: {
    body: {
      name: Joi.string().required(),
    },
  },
  password: {
    body: {
      newPass: Joi.string().required(),
      oldPass: Joi.string().required(),
    },
  },
};
