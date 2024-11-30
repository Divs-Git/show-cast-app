import CollectionView from '@/views/CollectionView.vue'
import HomeView from '@/views/HomeView.vue'
import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/collections',
      name: 'collections',
      component: CollectionView,
    },
  ],
})

export default router
