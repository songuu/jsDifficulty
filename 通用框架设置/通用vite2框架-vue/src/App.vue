<!--
 * @Author: songyu
 * @Date: 2021-04-26 09:53:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:33:11
-->
<template>
  <div>1222</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    onMounted(() => {
      axios({
        method: 'get',
        url: '/api/s?wd=12306&rsv_spt=1&rsv_iqid=0xebcfba5400005c16&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_dl=tb&rsv_sug3=5&rsv_sug1=2&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=738&rsv_sug4=1501',
      }).then((res) => console.log(res));
    });
  },
});
</script>

<style>
</style>