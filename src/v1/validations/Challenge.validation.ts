import Joi from "joi";

export const challengeSchema = Joi.object().keys({
  title: Joi.string().required(),
  duration: Joi.string().required(),
  deadline: Joi.string().required().isoDate,
  role: Joi.string().required(),
  profilePicture: Joi.string(),
});
