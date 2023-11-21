> bind函数实现

```js
// 第一版，实现改变this
Function.prototype.bind2 = function(context) {
    var self = this; // 需要改变this的函数
    var partArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
        var args = partArgs.concat(Array.prototype.slice.call(arguments, 0));
        return self.apply(context, args);
    }
}
// 第二版，当返回的函数被当作构造函数调用时，this指向构造对象
Function.prototype.bind2 = function(context) {
    var self = this; // 需要改变this的函数
    var partArgs = Array.prototype.slice.call(arguments, 1);
    var bound = function () {
        var args = partArgs.concat(Array.prototype.slice.call(arguments, 0));
        return self.apply(this instanceof bound ? this : context, args);
      };
    var fNop = function () {};
    fNop.prototype = self.prototype;
    bound.prototype = new fNop();
    return bound;
}
```

> 对象深度，空对象当作一级，属性值为数组则不向下查找

```js
// 递归，深度优先遍历
function getObjectDeep(obj, arr = []) {
    var count = 0;
    obj && arr.indexOf(obj) === -1 && arr.push(obj);
    if (obj && !Array.isArray(obj) && typeof obj === 'object') {
      count = 1;
      var result = Object.keys(obj).map(function (item) {
        if (typeof obj[item] === 'object' && arr.indexOf(obj[item]) === -1) { // 防止循环引用
          arr.push(obj[item]);
          return 1 + getObjectDeep(obj[item], arr);
        } else {
          return 1;
        }
      });
      for (var i = 0; i < result.length; i++) {
        if (count < result[i]) {
          count = result[i];
        }
      }
    }
    return count;
}

// 非递归，宽度优先遍历
  function getObjectDeep(obj) {
    var count = 0;
    var queueObj = [obj];
    var arrs = [obj]; // 防止循环引用
    var last = obj; // 当前层级最后一个
    
    var checkObj = function(param) { return param !== null && param !== undefined && !Array.isArray(param) && typeof param === 'object' };

    if (checkObj(obj)) {
      while (queueObj.length) {
        var currentObj = queueObj.shift();
        Object.keys(currentObj).forEach(function (item) {
          if (checkObj(currentObj[item]) && arrs.indexOf(currentObj[item]) === -1) {
            arrs.push(currentObj[item]);
            queueObj.push(currentObj[item]);
          }
        });
        if (currentObj === last) {
          count += 1;
          last = queueObj.length ? queueObj[queueObj.length - 1] : null;
        }
      }
    }

    return count;
  }
```

> 求契波那切数列的第N项

```js
function Fibonacci(n) {
  if (n <= 2) {
    return n;
  }
  let num1 = 1;
  let num2 = 1;
  let sum = 0;
  while ((n--) > 2) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
  }
  return sum;
}
```

> 获取契波那切数列的前N项

```js
function Fibonacci(n) {
  if (n <= 2) {
    return n > 1 ? [1, 1] : [1];
  }
  let num1 = 1;
  let num2 = 1;
  let sum = 0;
  const queue = [num1, num2];
  while ((n--) > 2) {
    sum = num1 + num2;
    num1 = num2;
    num2 = sum;
    queue.push(sum);
  }
  return queue;
}
```

> 实现下面这道题中的machine函数

```js
function machine() {
    
}
machine('ygy').execute() 
// start ygy
machine('ygy').do('eat').execute(); 
// start ygy
// ygy eat
machine('ygy').wait(5).do('eat').execute();
// start ygy
// wait 5s（这里等待了5s）
// ygy eat
machine('ygy').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat
```

```js
function machine() {
  var txt = arguments[0];
  return new Job(txt);
}

function Job(name) {
  this.name = name;
  this.fn = Promise.resolve();
  this.jobs = [{ fn: () => console.log('start ', this.name) }];
}

Job.prototype.execute = function () {
  this.jobs.forEach(job => this.fn = this.fn.then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(job.fn());
      }, job.time || 0);
    });
  }));
};
Job.prototype.do = function (str) {
  this.jobs.push({ fn: () => console.log(`${this.name} ${str}`) });
  return this;
};
Job.prototype.wait = function (num) {
  this.jobs.push({ fn: ()=> console.log(`wait ${num}s`), time: num * 1000 });
  return this;
};

Job.prototype.waitFirst = function (num) {
  this.jobs.unshift({ fn: ()=> console.log(`wait ${num}s`), time: num * 1000 });
  return this;
};

// 关注点分离
function machine() {
  var txt = arguments[0];
  return new Job(txt);
}

function Job(name) {
  this.name = name;
  this.jobs = [new JobItem(() => console.log('start ', this.name))];
}

function JobItem(fn, time) {
  this.fn = fn;
  this.time = time || 0;
}

function defer(job) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(job.fn());
    }, job.time || 0);
  });
}

Job.prototype.execute = async function () {
  while (this.jobs.length) {
    const job = this.jobs.shift();
    await defer(job);
  }
};
Job.prototype.do = function (str) {
  this.jobs.push(new JobItem(() => console.log(`${this.name} ${str}`)));
  return this;
};
Job.prototype.wait = function (num) {
  this.jobs.push(new JobItem(()=> console.log(`wait ${num}s`), num * 1000));
  return this;
};

Job.prototype.waitFirst = function (num) {
  this.jobs.unshift(new JobItem(()=> console.log(`wait ${num}s`), num * 1000));
  return this;
};
```

> js 对象深拷贝

```js
// 不考虑原型
  function deepClone(obj) {
    // null, undefined, function, non-object
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    var result = Array.isArray(obj) ? [] : (obj.constructor ? new obj.constructor() : {});
    Object.keys(obj).forEach(function (key) {
      result[key] = deepClone(obj[key]);
    });
    return result;
  }
```

> 合并数组中相邻且重复的元素

说明：请实现一个函数 merge，传入一个数组，合并数组中【相邻且重复】的元素。

示例：
```js
merge([3,2,2,4,5,5,6,2,1]); // 输出[3,2,4,5,6,2,1]
merge([3,2,3]); // 输出[3,2,3]
merge([2,2,3]); // 输出[2,3]
```

```js
function fn(arr) {
  var ret = [];
  if (!Array.isArray(arr) || arr.length === 0) {
    return ret;
  }
  for (var i = 0; i < arr.length; i++) {
    if (ret[ret.length - 1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}
```

> 函数组合运行

说明：实现一个方法，可将多个函数方法按从左到右的方式组合运行。
如composeFunctions(fn1,fn2,fn3,fn4)等价于fn4(fn3(fn2(fn1))。

示例
```js
const add = x => x + 1;
const multiply = (x, y) => x * y;
const multiplyAdd = composeFunctions(multiply, add);
multiplyAdd(3, 4) // 返回 13
```

```js
function composeFunctions() {
  var slice = Array.prototype.slice;
  var fnArgs = slice.call(arguments, 0);
  return function () {
    var args = slice.call(arguments, 0);
    if (fnArgs.length === 1) {
      return fnArgs[0].apply(this, args);
    }
    return fnArgs.reduce(function (fn1, fn2) {
      return fn2(fn1.apply(this, args));
    });
  }
}
```

> 最长不重复子串

```js
function fn(str) {
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
```

> 将给定元素插入到从小到大排序数组的合适位置，并返回插入值下标，如果数组中已存在该值，则直接返回该值下标。

```js
function insert(arr, num) {
  if (arr && Array.isArray(arr)) {
    var left = 0;
    var right = arr.length - 1;
    var mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      if (num > arr[mid]) {
        left = mid + 1;  
      } else if (num < arr[mid]) {
        right = mid - 1;  
      } else {
        return mid;  
      }
    }
    arr.splice(left, 0, num);
    return left;
  }
  return -1;
}
```

> 按行打印二叉树层级节点值，逗号作为间隔

```js
function fn(root) {
  if (root) {
    var queue = [root];
    var currentLength = queue.length;
    var current = null;
    var currentArr = [];
    while (queue.length) {
      current = queue.shift();
      currentLength--;
      currentArr.push(current.value);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      if (currentLength === 0) {
        console.log(currentArr.join(', '));
        currentArr.length = 0;
        currentLength = queue.length;
      }
    }
  }
}
```

> 给出数组超过半数的数字，不存在的话输出没有（要求事件复杂度最低）

```js
function moreThanHalf(arr) {
  if (arr && Array.isArray(arr)) {
    var times = result = index = 0;
    for(;index < arr.length; index++) {
      if (times === 0) {
        result = arr[index];
        times++;
      } else if (result !== arr[index]) {
        times--;
      } else {
        times++;
      }
    }
    if (times) {
      times = index = 0;
      for (;index < arr.length; index++) {
        if (result === arr[index]) {
          times++;
        }
      }
      if (times > arr.length / 2) {
        return result;
      }
    }
  }
  return '没有';
}
```

> 输出程序运行结果

```js
var x = 1;

var bar = function () {
  console.log(this.x);
}

var obj1 = { x: 1 };
var obj2 = { x: 2 };
var obj3 = { x: 3 };

var fun = bar.bind(obj1);
fun();
fun = bar.bind(obj1).bind(obj2);
fun();
fun = bar.bind(obj1).bind(obj2).bind(obj3);
fun();
/*
1
1
1
*/
```

> 将文本整理成3行四列

```js
d2d 99 @12 .,sk
     <sss 90 "dd" ssaa!q
   ka ak   askjk  kajk
整理成
[ [ 'd2d', '99', '@12', '.,sk' ],
  [ '<sss', '90', '"dd"', 'ssaa!q' ],
  [ 'ka', 'ak', 'askjk', 'kajk' ] ]
```   

```js
var string =
  `
  d2d 99 @12 .,sk
     <sss 90 "dd" ssaa!q
   ka ak   askjk  kajk
   `;

function fn(str) {
  var arr = [];
  var current = [];
  var arrTemp = [];
  var start = 0;
  var end = str.length;
  var currentStr = '';
  var spaceStr = ' ';
  var newLineStr = '\n';
  while (start < end) {
    currentStr = str[start++];
    if (currentStr === spaceStr) {
      if (arrTemp.length) {
        current.push(arrTemp.join(''));
        arrTemp.length = 0;
      }
    } else if (currentStr === newLineStr) {
      if (arrTemp.length) {
        current.push(arrTemp.join(''));
        arrTemp.length = 0;
      }
      if (current.length) {
        arr.push(current);
      }
      current = [];
    } else {
      arrTemp.push(currentStr);
    }
    if (start === end) {
      if (arrTemp.length) {
        current.push(arrTemp.join(''));
      }
      if (current.length) {
        arr.push(current);
      }
    }
  }
  return arr;
}
console.log(fn(string))
```