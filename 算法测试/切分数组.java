


private List<Integer> prim;
private int Pn = 1000050;
private boolean[] isnotprime = new boolean[Pn];
private int[] pflag = new int[Pn];

private void sovleP()
{
    Arrays.fill(isnotprime,false);
    isnotprime[0] = true;
    isnotprime[1] = true;

    prim = new ArrayList<>();

    for (int i = 2; i * i < Pn ; i++)
    {
        if(isnotprime[i]) continue;
        prim.add(i);
        for (int j = i; j < Pn; j += i)
        {
            isnotprime[j] = true;
        }
    }
}

public int splitArray(int[] nums)
{
    int ans = 0;
    if(nums == null || nums.length == 0) return ans;

    // 求解所有素数
    sovleP();

    int n = nums.length;
    int[] dp = new int[n+1];

    List<Integer> has = new ArrayList<>();
    Arrays.fill(pflag,n);// 所有的质数最小划分数都是n
    Arrays.fill(dp,n);

    dp[0] = 0;
    for (int i = 1; i <= n; i++)
    {
        // 得到当前值
        int x = nums[i-1];
        has.clear();// 有哪些素数

        for (int j = 0; j < prim.size(); j++)
        {
            int p = prim.get(j);
            if(x < p) break; // 比素数都要小，那肯定就出来了
            // 如果包含这个素数
            if(x % p == 0)
            {
                has.add(p);
                while (x % p == 0) x/=p; // 去掉所有素数
            }
        }

        // 还有余
        if(x != 1) has.add(x);

        // 先更新每个质数空间
        for (int j = 0; j < has.size(); j++)
        {
            int p = has.get(j);
            pflag[p] = Math.min(pflag[p],dp[i-1]);
        }

        for (int j = 0; j < has.size(); j++)
        {
            int p = has.get(j);
            dp[i] = Math.min(dp[i],pflag[p] + 1);
        }
    }

    return dp[n];
}