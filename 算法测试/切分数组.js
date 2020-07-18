/*
  给定一个整数数组 nums ，小李想将 nums 切割成若干个非空子数组，使得每个子数组最左边的数和最右边的数的最大公约数大于 1 。为了减少他的工作量，请求出最少可以切成多少个子数组。
*/
function solvePrime(num) {
  var arr = [];
  //大于2的每一个数都进行判断:
  for (var a = 2, i = 0; a <= num; a++) {
    //每次循环都从2开始判断这个数能否被整除:
    var b = 2
    //若a不能被b整除,则可能是质数:
    while (a % b != 0) {
      b++
    }
    //b已经循环到与a相等,说明到达a之前没有可以整除a的数,那这个数就是质数:
    if (a == b) {
      arr.push(a);
    }
  }
  return arr;
}

let a = solvePrime(100)

console.log(a)