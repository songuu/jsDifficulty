/* 
    * 直接使用的式proxy
    * proxy  get  set reflect
    * 消息订阅的模式
*/

// 需要判断是不是最新的依赖

let currentEffect;

class Dep {
    constructor() {
        // 设置收集依赖的容器
        this.effects = new Set();
    }

    // 依赖收集
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    // 依赖分发
    notify() {
        for (let effct of this.effects) {
            effct();
        }
    }
}

// 依赖注入
const watchEffect = (effct) => {
    currentEffect = effct;
    effct();
    currentEffect = null;
}

const targetMap = new WeakMap();

function reactive(raw) {
    const getDep = (target, key) => {
        let depsMap = targetMap.get(target);

        if (!depsMap) {
            depsMap = new Map();
            targetMap.set(target, depsMap)
        }

        let dep = depsMap.get(key);

        if (!dep) {
            dep = new Dep();
            depsMap.set(key, dep);
        }

        return dep;
    }

    return new Proxy(raw, {
        get(target, key) {
            // 去找到当前 key 对应的 dep
            const dep = getDep(target, key);
            // 依赖收集
            dep.depend();

            // return target[key]
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            console.log(target)
            console.log(key)
            console.log(value)
            const dep = getDep(target, key);
            const result = Reflect.set(target, key, value);

            dep.notify();
            return result;
        }
    })
}

if (typeof exports !== 'undefined') {
    module.exports = {
        reactive,
        watchEffect,
    };
}