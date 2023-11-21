const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

// expected { tesla: 'tesla', 'model 3': 'model 3',
// 'model X': 'model X', 'model Y': 'model Y' }
type result = TupleToObject<typeof tuple>;

// PropertyKey ts 自带类型 string | number | symbol
type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};