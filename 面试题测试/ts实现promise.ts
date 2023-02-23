class MyPromise<T> {
  private _state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private _value: T | undefined;
  private _reason: any;
  private _onFulfilledCallbacks: ((value: T) => void)[] = [];
  private _onRejectedCallbacks: ((reason: any) => void)[] = [];

  constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: T): void {
    if (this._state === 'pending') {
      this._state = 'fulfilled';
      this._value = value;
      this._onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  }

  private reject(reason?: any): void {
    if (this._state === 'pending') {
      this._state = 'rejected';
      this._reason = reason;
      this._onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  }

  then<U>(onFulfilled?: (value: T) => U, onRejected?: (reason: any) => U): MyPromise<U> {
    const promise2 = new MyPromise<U>((resolve, reject) => {
      if (this._state === 'fulfilled') {
        try {
          const x = onFulfilled ? onFulfilled(this._value!) : this._value as unknown as U;
          MyPromise.resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else if (this._state === 'rejected') {
        try {
          const x = onRejected ? onRejected(this._reason) : this._reason as unknown as U;
          MyPromise.resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      } else {
        this._onFulfilledCallbacks.push((value: T) => {
          try {
            const x = onFulfilled ? onFulfilled(value) : value as unknown as U;
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        this._onRejectedCallbacks.push((reason: any) => {
          try {
            const x = onRejected ? onRejected(reason) : reason as unknown as U;
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise2;
  }

  catch<U>(onRejected?: (reason: any) => U): MyPromise<U> {
    return this.then(undefined, onRejected);
  }

  static resolve<T>(value: T): MyPromise<T> {
    return new MyPromise<T>((resolve) => resolve(value));
  }

  static reject(reason?: any): MyPromise<never> {
    return new MyPromise<never>((_, reject) => reject(reason));
  }

  static all<T>(promises: (T | Promise<T>)[]): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      const results: T[] = [];
      let completedCount = 0;


      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        if (promise instanceof MyPromise) {
          promise.then((value: T) => {
            results[i] = value;
            completedCount++;
            if (completedCount === promises.length) {
              resolve(results);
            }
          }, (reason: any) => {
            reject(reason);
          });
        } else {
          results[i] = promise;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        }
      }
    });
  }

  static race<T>(promises: (T | Promise<T>)[]): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        if (promise instanceof MyPromise) {
          promise.then((value: T) => {
            resolve(value);
          }, (reason: any) => {
            reject(reason);
          });
        } else {
          resolve(promise);
        }
      }
    });
  }

  private static resolvePromise<T>(
    promise: MyPromise<T>,
    x: T | MyPromise<T>,
    resolve: (value: T) => void,
    reject: (reason?: any) => void,
  ): void {
    if (x === promise) {
      reject(new TypeError('Chaining cycle detected'));
    } else if (x instanceof MyPromise) {
      if (x._state === 'fulfilled') {
        resolve(x._value!);
      } else if (x._state === 'rejected') {
        reject(x._reason);
      } else {
        x.then(resolve, reject);
      }
    } else if (x && typeof x === 'object' || typeof x === 'function') {
      let then;
      try {
        then = (x as { then: any }).then;
      } catch (error) {
        reject(error);
      } if (typeof then === 'function') {
        let called = false;

        try {
          then.call(x, (y: T) => {
            if (called) {
              return;
            }
            called = true;
            MyPromise.resolvePromise(promise, y, resolve, reject);
          }, (r: any) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          });
        } catch (error) {
          if (called) {
            return;
          }
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x as T);
    }
  }
}

const pp = new MyPromise<void>((resolve, reject) => {
  console.log(0)
  reject()
  console.log(1)
  resolve()
  console.log(2)
})