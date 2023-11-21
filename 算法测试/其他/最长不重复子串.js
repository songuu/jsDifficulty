/*
 * @Author: songyu
 * @Date: 2021-05-24 17:54:15
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-25 09:29:33
 */
// "pwwkew"
function fn(str) {
  if (!str || typeof str !== 'string') {
    return ''
  }
  var arr = []
  var pos = (i = start = end = index = 0)
  while (true) {
    index = arr.indexOf(str[i])
    if (i < str.length && index === -1) {
      arr.push(str[i])
      i++
    } else {
      /*
       * 含有
       * 1. arr第一个元素
       * 2. arr非第一个元素
       * 3. 记录下当前开始和结束的位置
       */
      console.log("当前所在的位置", i)
      console.log("arr", arr)
      console.log("开始标识符", start)
      console.log("结束标识符", end)
      if (arr.length > end - start) {
        start = pos
        end = i
      }

      console.log("交换开始标识符", start)
      console.log("交换结束标识符", end)
      console.log("当前所在的位置", pos)
      if (end - start === str.length || pos + 1 >= str.length - end + start) {
        break
      } else {
        arr.length = 0
      }
      console.log("执行之后的index", index)

      i = pos = pos + index + 1

      console.log("执行之后的i", i)
      console.log("执行之后的pos", pos)
    }
  }
  console.log(arr)

  console.log(start, end)
  return str.substr(start, end)
  // return arr.length
  // return end - start;
}

function maxStr(str) {
  // 非字符窜类型
  if (!str || typeof str !== 'string') {
    return ''
  }
  let arr = []

  let pos = (i = start = end = index = 0)

  while (true) {
    let index = arr.indexOf(str[i])

    // 不含有
    if (i < str.length && index === -1) {
      arr.push(str[i])
      i++
    } else {
      if (arr.length > end - start) {
        pos = start
        end = i
      }

      arr.length = 0

      if (end - start === str.length || pos + 1 >= str.length - end + start) {
        break
      }
      i = pos = pos + index + 1
    }
  }
}

// * 字符串找最长的不重复子串
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  var str = [], maxlength = 0;
  for (var i = 0; i < s.length; i++) {
    var index = str.indexOf(s[i]);
    if (index > -1) {
      str.splice(0, index + 1)
    }
    str.push(s[i]);
    maxlength = Math.max(maxlength, str.length);
  }
  return maxlength;
};

var lengthOfLongestSubstring = function(s) {
  var res = 0; // 用于存放当前最长无重复子串的长度
  var str = ""; // 用于存放无重复子串
  var len = s.length;
  for(var i = 0; i < len; i++) {
    var char = s.charAt(i);
    var index = str.indexOf(char);
    if(index === -1) {
      str += char;
      res = res < str.length ? str.length : res;
    } else {
      str = str.substr(index + 1) + char;
    }
  }
  return res; 
};

function fn1(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }
  var arr = [];
  var pos = i = start = end = index = 0;
  while (true) {
    index = arr.indexOf(str[i]);
    if (i < str.length && index === -1) {
      arr.push(str[i]);
      i++;

    } else {
      if (arr.length > end - start) {
        start = pos;
        end = i;
      }
      arr.length = 0;
      if (end - start === str.length || pos + 1 >= str.length - end + start ) {
        break;
      }
      i = pos = pos + index + 1;
    }
  }
  return str.substr(start, end);
}
console.log(fn("pwwkew"))
