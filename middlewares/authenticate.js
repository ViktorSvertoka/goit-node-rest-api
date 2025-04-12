import jwt from 'jsonwebtoken';

import HttpError from '../helpers/HttpError';

import { findUser } from '../services/authServices';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authorization header missing...'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer missing...'));
  }

  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ email });
    if (!user) {
      return next(HttpError(401, `User with email=${email} not found`));
    }
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
