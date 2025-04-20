import Joi from 'joi';
import { phoneRegexp } from '../constants/regexp.js';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
