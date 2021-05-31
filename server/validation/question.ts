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
};
