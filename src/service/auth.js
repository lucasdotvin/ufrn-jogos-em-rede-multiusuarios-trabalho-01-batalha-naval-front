export default class AuthService {
  cookies = null

  constructor(cookies) {
    this.cookies = cookies
  }

  async signIn(username, password) {
    const url = import.meta.env.VITE_API_URL + '/api/v1/auth/sign-in'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      return await response.json()
    }

    return null
  }

  async signUp(name, username, password) {
    const url = import.meta.env.VITE_API_URL + '/api/v1/auth/sign-up'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password })
    })

    if (response.ok) {
      return await response.json()
    }

    return null
  }

  async refresh() {
    const url = import.meta.env.VITE_API_URL + '/api/v1/auth/refresh'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })

    return response.ok
  }

  isAuthenticated() {
    return this.cookies.isKey('access_token_duration')
  }

  canRenew() {
    return this.cookies.isKey('refresh_token_duration')
  }

  getBroadcastToken() {
    return this.cookies.get('broadcast_token')
  }

  ensureAuthentication() {
    if (this.isAuthenticated()) {
      return true
    }

    if (this.canRenew()) {
      return this.refresh()
    }

    return false
  }

  async authenticatedFetch(url, options = null) {
    if (!this.ensureAuthentication()) {
      return {
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      }
    }

    return await fetch(url, { ...options })
  }

  authenticatedWebSocket(url) {
    if (!this.ensureAuthentication()) {
      return null
    }

    const token = this.getBroadcastToken()
    const parsedUrl = new URL(url)
    parsedUrl.searchParams.append('broadcast_token', token)

    return new WebSocket(parsedUrl)
  }
}
