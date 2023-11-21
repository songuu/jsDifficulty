function add5(x: number) {
  return x + 5;
}

function div2(x: number) {
  return x / 2;
}

function sub3(x: number) {
  return x - 3;
}

let a: number = add5(div2(sub3(1)))

let b: number = sub3(div2(add5(1)))

console.log(a)
console.log(b)

const chain = [add5, div2, sub3].reduce((a, b) => (x: number) => a(b(x)));
const chain1 = [add5, div2, sub3].reduce((b, a) => (x: number) => b(a(x)));


console.log(chain(1))
console.log(chain1(1))
