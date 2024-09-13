// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';

// Import Framework7 and Framework7-Vue
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue from 'framework7-vue';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Framework7 Vue components
import {
  f7App,
  f7View,
  f7Page,
  f7Navbar,
  f7Block,
  f7Button,
} from 'framework7-vue';

// Create Vue App
const app = createApp(App);

// Use router
app.use(router);

// Initialize Framework7 Vue plugin
app.use(Framework7Vue, { Framework7 });

// Register Framework7 Vue components globally
app.component('f7-app', f7App);
app.component('f7-view', f7View);
app.component('f7-page', f7Page);
app.component('f7-navbar', f7Navbar);
app.component('f7-block', f7Block);
app.component('f7-button', f7Button);

// Mount the app
app.mount('#app');
