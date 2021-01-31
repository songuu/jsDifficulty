/* 
    [[0,0,0,0,1][1,1,1,1,1][0,0,0,0,1]]

    要求1左侧肯定出现的是0
*/

/* 
    思路一：暴力法  从右到左 从上到下
*/
function Max1To0M1(matrix) {
    let n = matrix.length;
    let m = matrix.length;

    let arr = [];
    let maxlen = 0;

    for(let i = 0;i < n;i++) {
        let j = m;

        while(j > 0 && matrix[i][j - 1] == 1) {
            j--;
        }

        if(maxlen < m - j) {
            maxlen = m - j;
            arr.length = 0;
        }

        if(maxlen == m - j) {
            arr.push(i)
        }
    }

    return arr;
}

/* 
    思路二：不重置列数据  从右到左 从上到下
*/
function Max1To0M2(matrix) {
    let n = matrix.length;
    let m = matrix.length;

    let arr = [];
    let maxlen = 0;

    let col = m;

    for(let i = 0;i < n;i++) {
        while(col > 0 && matrix[i][col - 1] == 1) {
            col--;
        }

        if(maxlen < m - col) {
            maxlen = m - col;
            arr.length = 0;
        }

        if(matrix[i][col] == 1) {
            arr.push(i)
        }
    }

    return arr;
}

/* 
    思路一：不重置列数据 并且 二分法实现  从右到左 从上到下
    使用于数据量很大
*/
function Max1To0M2(matrix) {
    let n = matrix.length;
    let m = matrix.length;

    let arr = [];
    let maxlen = 0;
    for(let i = 0;i < n;i++) {
        let j = mostLeft(matrix[i], 0, m - 1);
        if(maxlen < m - j) {
            maxlen = m - j;
            arr.length = 0;
        }

        if(maxlen == m - j) {
            arr.push(i)
        }
    }

    return arr;
}

/*
    设计的是[l...r]上面没有1  r + 1 为1 
 */
function mostLeft(arr, l, r) {
    let a = r + 1;
    let mid = 0;
    while(l < r) {
        mid = Math.floor((l + r) / 2);
        if(arr[mid] == 1) { // 中间的数为1
            a = mid; // 标志位到中间
            r = m - 1; // 到左侧
        } else {
            l = m + 1; // 到右侧
        }
    }
    return a;
}