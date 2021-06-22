/*
 * @Author: songyu
 * @Date: 2021-06-17 16:26:11
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 16:32:28
 */
class Logger {
  printName(name = '') {
    this.print(`hello ${name}`)
  }

  print(text) {
    console.log(text)
  }
}

// const logger = new Logger()

function selfish(target) {
  const cache = new WeakMap()
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key)

      if (typeof value !== 'function') {
        return value
      }

      if (!cache.has(value)) {
        cache.set(value, value.bind(target))
      }

      return cache.get(value)
    },
  }

  const proxy = new Proxy(target, handler)

  return proxy
}

const logger = selfish(new Logger())

const { printName } = logger;

printName()
