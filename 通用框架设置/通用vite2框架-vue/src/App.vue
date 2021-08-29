<!--
 * @Author: songyu
 * @Date: 2021-04-26 09:53:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:33:11
-->
<template>
  <div>1222</div>
</template>

<script lang="ts" setup>
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  const { getAntdLocale } = useLocale();
  useTitle();
</script>