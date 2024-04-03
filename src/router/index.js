import { createRouter, createWebHistory } from 'vue-router'
import { validateAuthentication } from '@/router/guards/auth.js'
import { validateRoomStatus } from '@/router/guards/room.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/views/SignIn.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUp.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('@/views/LobbyView/LobbyView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rooms/create',
      name: 'room.create',
      component: () => import('@/views/room/CreateView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rooms/:room',
      name: 'room.show',
      component: () => import('@/views/room/ShowView/ShowView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(validateAuthentication)
router.beforeEach(validateRoomStatus)

export default router
