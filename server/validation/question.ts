import Joi from "joi";

export const questionValidation = {
  create: {
    body: {
      type: Joi.number().required(),
      level: Joi.number().required(),
      title: Joi.string().required(),
      body: Joi.string().required(),
      score: Joi.number().required(),
      answerTime: Joi.number().required(),
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
};
