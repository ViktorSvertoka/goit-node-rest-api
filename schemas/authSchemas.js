import Joi from 'joi';
import { emailRegexp } from '../constants/regexp.js';

export const authSignupSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'username is required and cannot be empty',
    'any.required': 'username field is required',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.empty': 'email is required and cannot be empty',
    'string.pattern.base': 'email must be in a valid format',
    'any.required': 'email field is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'password is required and cannot be empty',
    'string.min': 'password must be at least 6 characters long',
    'any.required': 'password field is required',
  }),
});

export const authSigninSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'username is required and cannot be empty',
    'any.required': 'username field is required',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.empty': 'email is required and cannot be empty',
    'string.pattern.base': 'email must be in a valid format',
    'any.required': 'email field is required',
  }),
});
