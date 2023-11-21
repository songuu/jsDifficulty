import Vue from 'vue';
import uploader from 'vue-simple-uploader';
import elementUI from 'element-ui';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(uploader);
Vue.use(elementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
