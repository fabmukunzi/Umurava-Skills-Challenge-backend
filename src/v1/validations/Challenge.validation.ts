import Joi from "joi";

export const challengeSchema = Joi.object().keys({
  title: Joi.string().required(),
  duration: Joi.string().required(),
  deadline: Joi.date().required(),
  moneyPrize: Joi.number().required(),
  projectDescription: Joi.string().required(),
  projectBrief: Joi.string().required(),
  projectTask: Joi.string().required(),
  category: Joi.string().required(),
  skills: Joi.array().required(),
  seniority: Joi.array().required(),
  status: Joi.string().required(),
});
