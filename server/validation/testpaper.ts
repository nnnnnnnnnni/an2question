import Joi from "joi";

export const testpaperValidation = {
  create: {
    body: {
      title: Joi.string().required(),
    },
  },
  list: {
    query: {
      count: Joi.number().required(),
      page: Joi.number().required(),
    },
  },
  publish: {
    body: {
      id: Joi.string().required(),
      status: Joi.number().required()
    },
  },
  detail: {
    params: {
      id: Joi.string().required()
    }
  },
  delete: {
    body: {
      id: Joi.string().required(),
    },
  },
  update: {
    body: {
      _id: Joi.string().required(),
      title: Joi.string().required(),
    },
  },
};
