Array.prototype.filter = function (callback, args) {
    if (this === undefined) {
        throw new TypeError("this 是null 或者是 undefined")
    }

    if (typeof callback !== "function") {
        throw new TypeError("传入的必须是方法")
    }

    const res = [];
    const obj = Object(this)

    const len = obj.length >>> 0;

    for (let i = 0; i < len; i++) {
        if (i in obj) {
            if (callback.call(args, obj[i], i, obj)) {
                res.push(obj[i])
            }
        }
    }

    return res
}

Array.prototype.map = function (callback, args) {
    if (this === undefined) {
        throw new TypeError("this 是null 或者是 undefined")
    }

    if (typeof callback !== "function") {
        throw new TypeError("传入的必须是方法")
    }

    const res = [];

    const obj = Object(this);

    const len = obj.length >>> 0;

    for (let i = 0; i < len; i++) {
        if (i in obj) {
            res[i] = callback.call(args, obj[i], i, this)
        }
    }

    return res;
}

Array.prototype.forEach = function (callback, args) {
    if (this === undefined) {
        throw new TypeError("this 是null 或者是 undefined")
    }

    if (typeof callback !== "function") {
        throw new TypeError("传入的必须是方法")
    }

    const obj = Object(this);

    const len = obj.length >>> 0;

    let k = 0;

    while (k < len) {
        if (k in obj) {
            callback(args, obj[k], k, obj);
        }
        k++;
    }
}

Array.prototype.reduce = function (callback, initialValue) {
    if (this === undefined) {
        throw new TypeError("this 是null 或者是 undefined")
    }

    if (typeof callback !== "function") {
        throw new TypeError("传入的必须是方法")
    }

    const obj = Object(this);

    const len = obj.length >>> 0;

    let accumulator = initialValue;

    let k = 0;

    if (accumulator === undefined) {
        while (k < len && !(k in obj)) {
            k++
        }

        if (k > len) {
            throw new TypeError("reduce of empty array with no initial value")
        }

        accumulator = obj[k++];
    }

    while (k < len) {
        if (k in obj) {
            accumulator = callback.call(undefined, accumulator, obj[k], k, obj)
        }

        k++;
    }

    return accumulator;
}