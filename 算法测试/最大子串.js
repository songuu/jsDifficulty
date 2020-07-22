const getMaxString = (nums) => {
    if(nums.length === 0) {
        return ""
    } 

    let dp = new Array(nums.length).fill(0);

    dp[0] = nums[0];

    let res = dp[0];

    for(let i = 1;i < nums.length;i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        if(res < dp[i]) {
            res = dp[i];
        }
    }
    return res;
}