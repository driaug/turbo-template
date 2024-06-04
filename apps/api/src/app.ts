import {LANDING_URI, PORT} from './app/constants';
import {Users} from './controllers/Users';
import {prisma} from './database';
import {HttpException} from './exceptions';
import {Server} from '@overnightjs/core';
import cors from 'cors';
import signale from 'signale';

const server = new (class extends Server {
  public constructor() {
    super();

    this.app.use(
      cors({
        origin: ['http://localhost:3000'],
        credentials: true,
      }),
    );

    this.addControllers([new Users()]);

    this.app.get('/', (_, res) => res.redirect(LANDING_URI));

    this.app.use('*', () => {
      throw new HttpException(404, 'Unknown route');
    });
  }
})();

void prisma.$connect().then(() => {
  server.app.listen(PORT, () => signale.success('[HTTPS] Ready on', PORT));
});
