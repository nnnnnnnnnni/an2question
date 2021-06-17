import Joi from "joi";

export const managerValidation = {
  multiInsert: {
    body: {
      count: Joi.number().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    },
  },
  managerList: {
    query: {
      count: Joi.number().required(),
      page: Joi.number().required(),
    },
  },
};
