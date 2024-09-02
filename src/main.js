import { createApp } from 'vue';
import App from './App.vue';       // Root component
import router from './router';     // Import the router

import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const app = createApp(App);
app.use(router);   // Use the router in the Vue app
app.mount('#app'); // Mount the app to the #app element in index.html
