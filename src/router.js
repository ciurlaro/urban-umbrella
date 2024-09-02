import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';  // Import the Home component

const routes = [
  { path: '/', component: Home },  // Define a route for the home page
];

const router = createRouter({
  history: createWebHistory(),  // Use HTML5 history mode for clean URLs
  routes,                       // Register the routes
});

export default router;
