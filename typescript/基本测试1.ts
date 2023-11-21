interface TState {
  name: string;
  age: number;
  like: string[];
}
interface TSingleState extends Pick<TState, "name" | "age"> { };

class A implements TSingleState {
  constructor(name: string, age: number) {

  }
}

const AA = (): TSingleState => {
  return {
    name: '1',
    age: 10
  }
}

new A('lala', 11)

type LeftFields = Exclude<"1" | "2" | "3" | "4" | "5", "1" | "2">;

type MyNav = "a" | "b" | "c";

interface INavWidgets {
  widgets: string[];
  title?: string;
  keepAlive?: boolean;
}

const router: Record<MyNav, INavWidgets> = {
  a: { widgets: [""] },
  b: { widgets: [""] },
  c: { widgets: [""] },
};

type Parameters1<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

//   type c = Parameters

export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

const foo = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    resolve("linbudu");
  });
};

// Promise<string>
type FooReturnType = ReturnType<typeof foo>;

// string
type NakedFooReturnType = PromiseType<FooReturnType>;


let a: NakedFooReturnType = "1"


// 判断是不是字符窜
export const isString = (arg: unknown): arg is string =>
  typeof arg === "string";

// 判断是不是对象
export const isObj = (arg: unknown): boolean => typeof arg === "object" && arg !== null;

// 递归判断
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function useIt(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
}

function useIt1(obj: object) {
  if (isObj(obj)) {
    console.log(obj)
  }
}

export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

export type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];

interface IWithFuncKeys {
  a: string;
  b: number;
  c: boolean;
  d: () => void;
}

// 找出是函数的key-value
type WTFIsThis<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
};

type WTFIsNumber<T extends object> = {
  [K in keyof T]-?: T[K] extends Number ? K : never;
}

type UseIt1 = WTFIsThis<IWithFuncKeys>;

/*type UseIt1 = {
  a: never;
  b: never;
  c: never;
  d: "d";
};
*/

type UseIt2 = UseIt1[keyof UseIt1]; // d

