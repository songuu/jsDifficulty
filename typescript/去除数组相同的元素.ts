type Without<T extends unknown[], U> =
  T extends [infer E, ...infer Rest]
  ? E extends Exclude<T[number], U extends unknown[] ? U[number] : U>
    ? [E, ...Without<Rest, U>]
    : Without<Rest, U>
  : T