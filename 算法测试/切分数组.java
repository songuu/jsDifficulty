/*
  给定一个整数数组 nums ，小李想将 nums 切割成若干个非空子数组，使得每个子数组最左边的数和最右边的数的最大公约数大于 1 。为了减少他的工作量，请求出最少可以切成多少个子数组。
*/

/* 
  解题思路
  那么我们换个思路想一想，我们能否通过质数的一个递推关系来找到我们要的答案呢？
  因为我们知道在上面的递推过程中其实我们也只是要找到所有和num[i]有共同的质数的num[j]，那么我们可以定义一个pflag[p]来维护这个递推，pflag[p]的意思就是假如当前jj位置的质因子为pp，这个质因子pp和下一个数字也组成一次划分的前，最小的划分数前是多少
  那肯定就是pflag[p]=min(dp[j-1])，其中num[j]的质因子包含了pp
  那么我们暴力的递推就不需要这么弄了，我们每次只要找到质因子pp，求出dp[i]=min(pflag[p]+1)，这就代表了和上一个质数的位置jj组成[j,i]为1段，[0,...,j-1]自己再划分最小的划分数了
  那么维护就很好维护了，每次计算dp[i]前，先求出这个变量的所有质因子pp，然后通过pflag[p]=min(pflag[p],dp[i-1])
*/


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