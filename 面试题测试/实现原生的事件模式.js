// 3.请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
/*
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', ()=>console.log('I want sleep));
event.fire('sleep');
*/

/* 
  直接使用function实现的events
*/
function Events() {
  // 放置所有添加的 监听事件
  this._events = {}
}
Events.prototype = {
  on: function (name, fn, ...argOrg) {
    // 必传参数验证
    if (!name || !fn) {
      throw new Error(
        `[Events TypeError] Failed to execute 'Events' on '${name}' : 2 arguments required`
      )
      return
    }
    // 阻止重复添加相同的监听
    let fns = this._events[name] || []
    if (fns.find((item) => item.fnOrg === fn)) {
      return
    }
    this._events[name] = fns.concat({
      fn: (arg) => fn.apply(null, [...argOrg, ...arg]),
      fnOrg: fn,
    })
  },
  once: function (name, fn, ...argOrg) {
    const onFn = (...arg) => {
      fn.apply(null, arg)
      this.off(name, onFn)
    }
    this.on(name, onFn, ...argOrg)
  },
  emit: function (name, ...arg) {
    ;(this._events[name] || []).forEach((item) => {
      item.fn(arg)
    })
  },
  off: function (name, fn) {
    // 无参数 ： 清掉所有监听
    if (!arguments.length) {
      this._events = Object.create(null)
    }
    // 一个参数 ： 清掉该事件名下所有监听
    if (arguments.length == 1) {
      delete this._events[name]
    }
    let fns = this._events[name]
    if (!fns || !fns.length) return
    this._events[name] = (fns || []).filter((item) => {
      return item.fnOrg !== fn
    })
  },
}


declare module "events" {
  class internal extends NodeJS.EventEmitter { }

  interface NodeEventTarget {
      once(event: string | symbol, listener: (...args: any[]) => void): this;
  }

  interface DOMEventTarget {
      addEventListener(event: string, listener: (...args: any[]) => void, opts?: { once: boolean }): any;
  }

  namespace internal {
      function once(emitter: NodeEventTarget, event: string | symbol): Promise<any[]>;
      function once(emitter: DOMEventTarget, event: string): Promise<any[]>;

      /**
       * This symbol shall be used to install a listener for only monitoring `'error'`
       * events. Listeners installed using this symbol are called before the regular
       * `'error'` listeners are called.
       *
       * Installing a listener using this symbol does not change the behavior once an
       * `'error'` event is emitted, therefore the process will still crash if no
       * regular `'error'` listener is installed.
       */
      const errorMonitor: unique symbol;

      class EventEmitter extends internal {
          /** @deprecated since v4.0.0 */
          static listenerCount(emitter: EventEmitter, event: string | symbol): number;
          static defaultMaxListeners: number;

          addListener(event: string | symbol, listener: (...args: any[]) => void): this;
          on(event: string | symbol, listener: (...args: any[]) => void): this;
          once(event: string | symbol, listener: (...args: any[]) => void): this;
          prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
          prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
          removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
          off(event: string | symbol, listener: (...args: any[]) => void): this;
          removeAllListeners(event?: string | symbol): this;
          setMaxListeners(n: number): this;
          getMaxListeners(): number;
          listeners(event: string | symbol): Function[];
          rawListeners(event: string | symbol): Function[];
          emit(event: string | symbol, ...args: any[]): boolean;
          eventNames(): Array<string | symbol>;
          listenerCount(type: string | symbol): number;
      }
  }

  export = internal;
}