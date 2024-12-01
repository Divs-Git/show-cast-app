import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CollectionView from '@/views/CollectionView.vue'
import CastView from '@/views/CastView.vue' // Import CastView for details pages
import NotFoundView from '@/views/NotFoundView.vue' // Import NotFoundView for unmatched routes

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // Home Route
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Redirect '/home' to '/'
    {
      path: '/home',
      redirect: '/',
    },
    {
      path: '/collections/:collectionType',
      name: 'collection-view',
      component: CollectionView,
      beforeEnter: (to, from, next) => {
        const validTypes = ['tv', 'movie']
        if (validTypes.includes(to.params.collectionType)) {
          next()
        } else {
          next({ name: 'not-found' })
        }
      },
    },

    {
      path: '/collections/tv/:id',
      name: 'tv-casts',
      component: CastView,
      props: true,
    },
    {
      path: '/collections/movie/:id',
      name: 'movie-casts',
      component: CastView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
