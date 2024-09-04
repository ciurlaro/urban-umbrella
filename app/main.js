import { createApp } from 'vue';
import App from './App.vue';       // Root component
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';  // Import the Home component

import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

// Define routes
const routes = [
  { path: '/', component: Home },  // Define a route for the home page
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),  // Use HTML5 history mode for clean URLs
  routes,                       // Register the routes
});

// Create the Vue app and mount it
const app = createApp(App);
app.use(router);   // Use the router in the Vue app
app.mount('#app'); // Mount the app to the #app element in index.html
