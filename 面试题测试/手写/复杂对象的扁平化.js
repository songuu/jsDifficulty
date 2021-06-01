/*
 * @Author: songyu
 * @Date: 2021-05-31 21:22:43
 * @LastEditTime: 2021-05-31 21:57:41
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\复杂对象的扁平化.js
 */
const obj1 = {
    a: {
        b: 1,
        c: 2,
        d: {
            e: 5
        }
    },
    b: [1, 3, {
        a: 2,
        b: 3
    }],
    c: 3
}


const isObj = (obj) => {
    return typeof obj === "object" && obj !== null
}

const flatten = (obj) => {
    if (!isObj(obj)) {
        return;
    }

    let res = {};

    const flat = (objs, prefix = "") => {
        if (isObj(objs)) {
            if (Array.isArray(objs)) {
                objs.forEach((item, index) => {
                    flat(item, `${prefix}[${index}]`);
                })
            } else {
                for (let j in objs) {
                    flat(objs[j], `${prefix}${prefix ? "." : ""}${j}`)
                }
            }
        } else {
            res[prefix] = objs;
        }
    }

    flat(obj)
    return res;
}

let a = flatten(obj1)

console.log(a)