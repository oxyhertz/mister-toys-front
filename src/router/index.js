import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';
import about from '../views/about.vue';
import toyApp from '../views/toy-app.vue';
import toyDetails from '../components/toy-details.vue';
import toyEdit from '../components/toy-edit.vue';
import dashboard from '../views/dashboard.vue';
import reviewsExplore from '../views/reviews-explore.vue';
import userDetails from '../views/user-details.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
    {
      path: '/toy',
      name: 'toy-app',
      component: toyApp,
    },
    {
      path: '/toy/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/toy/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/toy/dashboard',
      name: 'toy-dashboard',
      component: dashboard,
    },
    {
      path: `/reviews`,
      name: 'reviews',
      component: reviewsExplore,
    },
    {
      path: '/user',
      name: 'user',
      component: userDetails,
    },
  ],
});

export default router;
