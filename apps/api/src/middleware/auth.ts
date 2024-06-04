import {JWT_SECRET} from '../app/constants';
import {NotAuthenticated} from '../exceptions';
import dayjs from 'dayjs';
import {NextFunction, Request, Response} from 'express';
import jsonwebtoken from 'jsonwebtoken';

/**
 * Middleware to check if this unsubscribe is authenticated on the dashboard
 * @param req
 * @param res
 * @param next
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  res.locals.auth = {type: 'jwt', data: JSON.parse(parseJwt(req))};

  next();
};

export const jwt = {
  /**
   * Extracts a unsubscribe id from a jwt
   * @param token The JWT token
   */
  verify(token: string): string | null {
    try {
      const verified = jsonwebtoken.verify(token, JWT_SECRET) as {
        id: string;
      };
      return verified.id;
    } catch (e) {
      return null;
    }
  },
  /**
   * Signs a JWT token
   * @param id The user's ID to sign into a jwt token
   */
  sign(id: string): string {
    return jsonwebtoken.sign({id}, JWT_SECRET, {
      expiresIn: '168h',
    });
  },
  /**
   * Find out when a JWT expires
   * @param token The user's jwt token
   */
  expires(token: string): dayjs.Dayjs {
    const {exp} = jsonwebtoken.verify(token, JWT_SECRET) as {
      exp?: number;
    };
    return dayjs(exp);
  },
};

/**
 * Parse a user's ID from the request JWT token
 * @param request The express request object
 */
export function parseJwt(request: Request): string {
  const token: string | undefined = request.cookies.token;

  if (!token) {
    throw new NotAuthenticated();
  }

  const id = jwt.verify(token);

  if (!id) {
    throw new NotAuthenticated();
  }

  return id;
}
