import {Request, Response} from 'express';
import {UserService} from '../services/UserService';
import {Controller, Get, Middleware} from '@overnightjs/core';
import {isAuthenticated} from '../middleware/auth';

@Controller('Users')
export class Users {
  @Get('@me')
  @Middleware([isAuthenticated])
  public async get(req: Request, res: Response) {
    const {data} = res.locals.auth;

    const user = await UserService.email(data.email);

    return res.status(200).json(user);
  }
}
