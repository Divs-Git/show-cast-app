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
    // Collections List View
    {
      path: '/collections/:collectionType',
      name: 'collection-view',
      component: CollectionView,
      beforeEnter: (to, from, next) => {
        // Ensure `collectionType` is valid
        const validTypes = ['tv', 'movie']
        if (validTypes.includes(to.params.collectionType)) {
          next()
        } else {
          next({ name: 'not-found' }) // Redirect to NotFound if invalid
        }
      },
    },

    {
      path: '/collections/tv/:id',
      name: 'tv-casts',
      component: CastView,
    },
    {
      path: '/collections/movie/:id',
      name: 'movie-casts',
      component: CastView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
