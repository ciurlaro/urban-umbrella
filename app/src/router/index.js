import {createRouter, createWebHistory} from 'vue-router';
import Quiz from '../views/QuizView/Quiz.vue';

const routes = [
    {path: '/', component: Quiz},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
