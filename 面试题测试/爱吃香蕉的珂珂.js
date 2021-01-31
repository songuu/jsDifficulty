/*珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）*/

/*
    示例 1：

输入: piles = [3,6,7,11], H = 8
输出: 4
示例 2：

输入: piles = [30,11,23,4,20], H = 5
输出: 30
示例 3：

输入: piles = [30,11,23,4,20], H = 6
输出: 23
*/

/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
    /* 
        首先判断最小的速度和最大的速度
        最小的速度为1 最大的速度为 当前数组中间的最大的那堆香蕉的数量

        可以直接使用二分法实现
    */
    let left = 1; // 速度的最小的值
    let right = Math.max(...piles);

    const eatAll = (piles, speed, H) => {
        return piles.reduce((sumTime, pile) => {
            return sumTime + Math.ceil(pile / speed);
        }, 0) <= H;
    }

    while (left < right) {
        let middle = Math.floor((right + left) / 2);

        // 判断当前是否可以被吃完
        if (eatAll(piles, middle, H)) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }

    return right;
}

let piles = [3,6,7,11];

let a = minEatingSpeed(piles, 8)

console.log(a)