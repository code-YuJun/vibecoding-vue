import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/contacts',
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: () => import('@/views/Contacts/index.vue'),
    },
  ],
})

export default router