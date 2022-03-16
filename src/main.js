import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from './store';
import './styles/styles.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDDPU0klAYgZ5vTcORmLM0YJJ60gklOPvg',
  },
});
app.mount('#app');
