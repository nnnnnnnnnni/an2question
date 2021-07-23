import Joi from "joi";

export const examValidation = {
  create: {
    body: {
      title: Joi.string().required(),
      type: Joi.number().allow(1, 2).required(),
      testpaper: Joi.string().required(),
      participants: Joi.array().required(),
      times: Joi.number().min(0).max(300).required(),
      startAt: Joi.date(),
      closeAt: Joi.date(),
      status: Joi.number().allow(1, 2),
      note: Joi.string().required(),
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
