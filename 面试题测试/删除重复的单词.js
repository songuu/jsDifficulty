/* 
  js删除重复的单词
  this this is is a dog
*/
let str = 'this this is is a dog';

let newStr = [...new Set(str.split(' '))].join(' ');

let newStr1 = str.replace(/\b(\w+)\s+\1\b/gi, '$1');

console.log(newStr)
console.log(newStr1)
