// * 可选链
const person = {
  firstName: "Lydia",
  lastName: "Hallie",
  pet: {
    name: "Mara",
    breed: "Dutch Tulip Hound",
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

/* console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(person.getLastName?.()); */

// * es7 中间的setter和getter
const config = {
  languages: [],
  get language() {
    return this.languages;
  },
  set language(lang) {
    return this.languages.push(lang);
  },
};

console.log(config.language);

// * hasOwnProperty
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);

// * defineProperty
/* 
	defineProperty 添加属性 但是需要指定是否可以迭代
*/
const person1 = { name: "Lydia" };

Object.defineProperty(person1, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));

// * 箭头函数和普通函数
function giveLydiaPizza() {
  return "Here is pizza!";
}

const giveLydiaChocolate = () =>
  "Here's chocolate... now go hit the gym already.";

console.log(giveLydiaPizza.prototype);
console.log(giveLydiaChocolate.prototype);
