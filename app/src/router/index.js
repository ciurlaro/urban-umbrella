import {createRouter, createWebHistory} from 'vue-router';
import Quiz from '../views/QuizPage/QuizPage.vue';
import Home from "../views/HomeView/Home.vue";

const routes = [
    {path: '/', component: Quiz}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
