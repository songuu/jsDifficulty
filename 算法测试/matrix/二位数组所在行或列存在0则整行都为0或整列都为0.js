/* 
    实现的是  [
        [1,2,3,4,0]
        [1,2,3,4,0]
        [1,2,0,4,0]
        [1,2,3,4,0]
        [1,0,3,4,0]
    ]
*/

/* 
    思路一： 主要的关键点还是在matrix[0][0] 上面   
        在matrix[n][0]  matrix[0][m]操作
*/
function setLineOrCol0M1(matrix) {
    let row0 = false;
    let col0 = false;

    let i = 0;
    let j = 0;

    for (i = 0; i < matrix[0].length; i++) {
        if (matrix[i] == 0) {
            row0 = true;
            break;
        }
    }

    for (i = 0; i < matrix.length; i++) {
        if (matrix[i] == 0) {
            col0 = true;
            break;
        }
    }

    for (i = 1; i < matrix.length; i++) {
        for (j = 1; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (i = 1; i < matrix.length; i++) {
        for (j = 1; j < matrix[0].length; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (row0) {
        for (i = 0; i < matrix[0].length; i++) {
            matrix[0][i] = 0;
        }
    }

    if (col0) {
        for (i = 0; i < matrix[0].length; i++) {
            matrix[i][0] = 0;
        }
    }

    return matrix;
}

/* 
    思路二： 主要的关键点还是在matrix[0][0] 上面   只用单独去管理第o列为0的数据
    必须是从下到上执行  保证第0行最后改变执行
*/
function setLineOrCol0M2(matrix) {
    let col0 = false;

    let i = 0;
    let j = 0;

    for (i = 1; i < matrix.length; i++) {
        for (j = 1; j < matrix[0].length; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;

                if (j == 0) {
                    col0 = true;
                } else {
                    matrix[0][j] = 0;
                }
            }
        }
    }

    for (i = matrix.length; i >= 0; i--) {
        if (j = 1; i < matrix[0].length; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (col0) {
        for (i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }

    return matrix;
}
