import {createApp} from 'vue';
import App from './App.vue';

import {createRouter, createWebHistory} from 'vue-router';
import routes from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import {createBootstrap} from 'bootstrap-vue-next';

const router = createRouter({
    // history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(createBootstrap());
app.use(router);

app.mount('#app');
