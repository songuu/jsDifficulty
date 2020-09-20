/* 
  js删除重复的单词
  this this is is a dog
*/
let str = 'this this is is a dog'

let newStr = [...new Set(str.split(' '))].join(' ')

let newStr1 = str.replace(/\b(\w+)\s+\1\b/gi, '$1')

console.log(newStr)
console.log(newStr1)
/*
\b 匹配单词的边界
\w 匹配单词字符
\s 空白字符
+ 匹配上一项的一次或多次
\1 是一个反向引用，它表示在第一对括号中所匹配的文本
\b 匹配单词边界
g 告诉正则表达式引擎匹配所有匹配项，而不是在第一次匹配后停止
i 忽略大小写
$1 表示分组的第一个文本内容 
*/
