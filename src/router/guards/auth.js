import { inject } from 'vue'

export const validateAuthentication = (to, from, next) => {
  const authService = inject('service.auth')

  const isAuthenticated = authService.ensureAuthentication()

  if (to.meta['requiresGuest'] && !isAuthenticated) {
    return next()
  }

  if (to.meta['requiresGuest'] && isAuthenticated) {
    return next({ name: 'lobby' })
  }

  if (to.meta['requiresAuth'] && isAuthenticated) {
    return next()
  }

  if (to.meta['requiresAuth'] && !isAuthenticated) {
    return next({ name: 'home' })
  }

  return next()
}
