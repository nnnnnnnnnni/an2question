import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HOME',
      component: () => import('@/pages/home.vue')
    }
  ],
});

export default router;
