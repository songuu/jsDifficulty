/// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，然后写一个 myClear，停止上面的 mySetInterVal 


// 函数式编程里面的this调用
const mySetInterVal = function (fn, a, b) {
    this.a = a;
    this.b = b;
    this.time = 0;
    this.timeOut = null;

    this.start = () => {
        this.timeOut = setTimeout(() => {
            fn();
            this.time++;
            this.start();
        }, this.a + this.time * this.b)
    }

    this.stop = () => {
        clearTimeout(this.timeOut);
        this.time = 0;
    }
}

// 函数式编程里面的直接使用函数编程

let ff = new mySetInterVal(() => { console.log(111) }, 1000, 2000);

ff.start();
ff.stop();