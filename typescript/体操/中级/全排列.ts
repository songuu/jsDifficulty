type Permutation<T, C = T> =
  //  递归到最后一层时，Exclude<A, A> 会返回 never，如果是 never ，就返回空元组，这样 [1, ...[]] 就是[1]，从而还原原本的排列
  [T] extends [never]
  ? []
  : // 触发分发特性
  T extends any
  ? // 此时的 T 就是当前元素而非整个元组，故通过 C = T 保留原来的元组，从而 Exclude<C, T> 可以得到剩余元素
  [T, ...Permutation<Exclude<C, T>>]
  : never;


const a: Permutation<[1, 2, 3]> = [] as any;

const b: Permutation<[1, 2, 3, 4]> = [] as any;

// 直接使用ts实现一个全排列

const permute = (nums: number[]): number[][] => {
  const res: number[][] = [];

  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    nums.forEach(n => {
      if (path.includes(n)) return;
      backtrack(path.concat(n));
    });
  }

  backtrack([])

  return res;
}


console.log(permute([1, 2, 3]));