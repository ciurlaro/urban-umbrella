import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

import Framework7Plugin from './plugins/framework7';
import GlobalComponents from './plugins/global-components';
import './plugins/framework7-styles';

const app = createApp(App);

app.use(router);

app.use(Framework7Plugin);
app.use(GlobalComponents);

app.mount('#app');
