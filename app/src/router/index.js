import {createRouter, createWebHistory} from 'vue-router';
import Quiz from '../views/QuizView/Quiz.vue';
import Home from "../views/HomeView/Home.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/Quiz', component: Quiz}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
