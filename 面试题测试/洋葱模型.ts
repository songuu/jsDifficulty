function add5(x: number) {
  return x + 5;
}

function div2(x: number) {
  return x / 2;
}

function sub3(x: number) {
  return x - 3;
}

let a: number = add5(div2(sub3(1)))

let b: number = sub3(div2(add5(1)))

console.log(a)
console.log(b)

const chain = [add5, div2, sub3].reduce((a, b) => (x: number) => a(b(x)));
const chain1 = [add5, div2, sub3].reduce((b, a) => (x: number) => b(a(x)));

console.log(chain(1))
console.log(chain1(1))

type Middleware<T> = (context: T, next: () => Promise<void>) => Promise<void> | void;
type Context = { [key: string]: any }; // 可根据需要自定义上下文类型

class OnionModel<T> {
  private middlewares: Middleware<T>[] = [];

  // 用于注册中间件
  use(middleware: Middleware<T>) {
    this.middlewares.push(middleware);
  }

  // 执行中间件
  async execute(context: T) {
    const dispatch = async (i: number): Promise<void> => {
      if (i < this.middlewares.length) {
        const middleware = this.middlewares[i];
        await middleware(context, () => dispatch(i + 1));
      }
    };

    await dispatch(0);
  }
}

const app = new OnionModel<Context>();

// 注册中间件
app.use(async (ctx, next) => {
  console.log('Middleware 1 before');
  ctx.middleware1 = true; // 可以修改上下文
  await next();
  console.log('Middleware 1 after');
});

app.use(async (ctx, next) => {
  console.log('Middleware 2 before');
  await next();
  console.log('Middleware 2 after');
});

app.use(async (ctx, next) => {
  console.log('Middleware 3');
  await next(); // 可选，因为这是最后一个中间件
});

// 执行中间件
app.execute({}).then(() => console.log('All middlewares executed'));

