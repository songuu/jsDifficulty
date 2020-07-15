/* 
  算法题：
  给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值; 
  X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和; 
  现在需要你找出数列a的所有区间中, X值最大的那个区间; 如数列a为: 3 1 6 4 5 2; 
  则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;
*/

/* 
  1.计算所有的可能，然后再单独的计算
*/

// 实现计算最小的组合和的大小

// s & (1 == 1) 计算s是奇数还是偶数 奇数返回1 偶数返回0
// a.push() 返回的是添加以后数组的长度
let contexts = [5, 2, 3, 4]
for (var a = []; a.push([]) < contexts.length; );
let d = [];
var b = Math.pow(2, contexts.length) - 1 // 计算存在的情况的数量
for (var i = 1; i <= b; i++) {
  var c = []
  for (var s = i, k = 0; s > 0; s >>= 1, k++) {
    if (s & (1 == 1)) c.push(contexts[k])
  }
  // a[c.length - 1].push(c.join(''))
  d.push(c);
}

var max = 0;
var maxArr = [];
for(let i of d) {
  let total = 0;
  total = i.reduce((t, j) => {
    return t + j;
  }, 0) * Math.min(...i);
  maxArr = total > max ? [...i] : maxArr;

  max = total > max ? total : max;
}
console.log(`最大的和是${max}, 最大的数组是${maxArr}`);
