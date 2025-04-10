import Joi from 'joi';
import { phoneRegexp } from '../constants/regexp.js';

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'name is required and cannot be empty',
    'any.required': 'name field is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'email is required and cannot be empty',
    'string.email': 'email must be a valid email address',
    'any.required': 'email field is required',
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    'string.empty': 'phone is required and cannot be empty',
    'string.pattern.base': 'phone must be in format XXX XXX XX XX',
    'any.required': 'phone field is required',
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'name cannot be empty',
  }),
  email: Joi.string().email().messages({
    'string.empty': 'email cannot be empty',
    'string.email': 'email must be a valid email',
  }),
  phone: Joi.string().pattern(phoneRegexp).messages({
    'string.empty': 'phone cannot be empty',
    'string.pattern.base': 'phone must be in format XXX XXX XX XX',
  }),

  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
