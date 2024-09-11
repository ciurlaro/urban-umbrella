import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import {createBootstrap} from 'bootstrap-vue-next';

const app = createApp(App);

app.use(createBootstrap());
app.use(router);

app.mount('#app');
