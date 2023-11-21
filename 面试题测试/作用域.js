// *  1
window.name = 'ByteDance';

function A() {

    this.name = 123;

}

A.prototype.getA = function () {

    console.log(this);

    return this.name + 1;

}

let a = new A();

let funcA = a.getA;

funcA();



// * 2
window.name = 'ByteDance';

class A {

    constructor() {

        this.name = 123;

    }

    getA() {

        console.log(this);

        return this.name + 1;

    }

}

let a = new A();

let funcA = a.getA;

funcA();

// * 3
function a() {

    console.log('a');

    Promise.resolve().then(() => {

        console.log('e');

    });

}

function b() {

    console.log('b');

}

function c() {

    console.log('c');

}

function d() {

    setTimeout(a, 0);

    var temp = Promise.resolve().then(b);

    setTimeout(c, 0);

    console.log('d');

}

d();