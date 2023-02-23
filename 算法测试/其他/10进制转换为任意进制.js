function tenToOther(num, base) {
  const baseNumber = "0123456789abcdefghijklmnopqrstuvwxyz";
  const result = [];
  while (num) {
    const rest = num % base;
    num = Math.floor(num / base);
    result.unshift(baseNumber[rest]);
  }
  return result.join("");
}


let res = tenToOther(100, 16)

console.log(res)