import {NODE_ENV} from '../app/constants';
import {prisma} from '../database';
import {Keys} from './keys';
import {wrapRedis} from './redis';
import dayjs from 'dayjs';

export class UserService {
  public static readonly COOKIE_NAME = 'token';

  public static async email(email: string) {
    return wrapRedis(Keys.User.email(email), async () => {
      return prisma.user.findUnique({where: {email}});
    });
  }

  /**
   * Generates cookie options
   * @param expires An optional expiry for this cookie (useful for a logout)
   */
  public static cookieOptions(expires?: Date) {
    return {
      httpOnly: true,
      expires: expires ?? dayjs().add(7, 'days').toDate(),
      secure: NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
    } as const;
  }
}
