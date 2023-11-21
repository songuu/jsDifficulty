import http from 'http';

interface Context {
  req: http.IncomingMessage;
  res: http.ServerResponse;
}

type Middleware = (ctx: Context, next: () => Promise<void>) => Promise<void>;

class Koa {
  middlewares: Middleware[];

  constructor() {
    this.middlewares = [];
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  createContext(req: http.IncomingMessage, res: http.ServerResponse): Context {
    return { req, res };
  }

  async handleRequest(ctx: Context): Promise<void> {
    const fnMiddleware = this.composeMiddleware();
    await fnMiddleware(ctx);
  }

  composeMiddleware(): Middleware {
    const middlewares = this.middlewares;

    return async function (ctx: Context, next: () => Promise<void>) {
      let index = -1;
      async function dispatch(i: number): Promise<void> {
        if (i <= index) {
          throw new Error('next() called multiple times');
        }

        index = i;
        const fn = middlewares[i];

        if (i === middlewares.length) {
          fn = next;
        }

        if (!fn) {
          return;
        }

        await fn(ctx, () => dispatch(i + 1));
      }

      await dispatch(0);
    };
  }

  listen(port: number, callback: () => void) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      await this.handleRequest(ctx);
    });

    server.listen(port, callback);
  }
}

export default Koa;
