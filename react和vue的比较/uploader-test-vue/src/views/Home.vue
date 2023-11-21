<template>
  <div class="home">
    <uploader1></uploader1>
    <global-uploader></global-uploader>
  </div>
</template>

<script>
// @ is an alias to /src
import globalUploader from '@/components/globalUploader.vue';
import uploader1 from '@/components/uploader1.vue'

export default {
  name: 'home',
  components: {
    globalUploader,
    uploader1
  },
};
</script>
