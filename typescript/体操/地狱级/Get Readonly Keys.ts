type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Expect<T extends true> = T;

type GetReadonlyObject<T> = {
  [Properties in keyof T as Equal<Pick<T, Properties>, Readonly<Pick<T, Properties>>> extends true ? Properties : never]: T[Properties]
}

// type GetReadonlyKeys<T> = {
//   [K in keyof T]-?: Readonly<T[K]> extends T[K] ? K : never;
// }[keyof T];

type GetReadonlyKeys<T> = keyof GetReadonlyObject<T>

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed: boolean;
}


type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
];
