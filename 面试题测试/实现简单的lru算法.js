/*
LRU是Least Recently Used的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰。
*/

/* 
    实现的用途:
        vue 2.6 keep-alive的实现原理和缓存策略法
        多点登录，限制一个账号允许登录 5 个端，那么第 6 个端登录时，就需要挤掉最早登录的那个端。
*/

var LRUCache = function (capacity) {
    this.cache = new Map();
    this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
    if (this.cache.has(key)) {
        // 存在即更新
        let temp = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, temp);
        return temp;
    }
    return -1;
};

LRUCache.prototype.put = function (key, value) {
    if (this.cache.has(key)) {
        // 存在即更新（删除后加入）
        this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
        // 不存在即加入
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
};