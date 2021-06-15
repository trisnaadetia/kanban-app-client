import Vue from 'vue';
import App from './App.vue';
import VueToastify from "vue-toastify";
import 'bootstrap/dist/css/bootstrap.css';
Vue.use(VueToastify);
new Vue({
    render: h => h(App),
}).$mount('#app');