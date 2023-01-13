class ItemMap extends Map {
    toArr() {
        return this.sort(Array.from(this));
    }

    toItems() {
        return this.toArr().map(([key]) => key);
    }

    toItemsKeys() {
        return this.toItems();
    }

    sort(arr) {
        return arr.sort(([, IOItemA], [, IOItemB]) => +IOItemA.index - +IOItemB.index);
    }

    set(key, val) {
        if (Array.isArray(key)) {
            this.sort(key).forEach(([itemId, ioitem]) => {
                super.set(String(itemId), ioitem);
            });
        } else {
            super.set(String(key), val);
        }
        return this;
    }

    first() {
        return this.toArr()[0]?.[1];
    }

    last() {
        return this.toArr().slice(-1)?.[0]?.[1];
    }

    getCurrentPos(item) {
        const arr = this.toArr();
        const current = arr.findIndex(([itemId, ioitem]) => itemId === item || ioitem === item);
        return [arr, current];
    }

    prev(item) {
        const [arr, current] = this.getCurrentPos(item);
        return current !== -1 ? arr[current - 1]?.[1] : undefined;
    }

    next(item) {
        const [arr, current] = this.getCurrentPos(item);
        return current !== -1 ? arr[current + 1]?.[1] : undefined;
    }

    filter(predicate) {
        return this.toArr().filter(predicate);
    }

    find(predicate) {
        return this.toArr().find(predicate);
    }

    findIndex(predicate) {
        return this.toArr().findIndex(predicate);
    }

    getVisible() {
        return this.filter(value => value[1].visible);
    }
}

export default ItemMap;
