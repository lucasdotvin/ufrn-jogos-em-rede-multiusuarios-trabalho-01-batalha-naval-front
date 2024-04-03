export default class ConfigService {
  async list() {
    const url = import.meta.env.VITE_API_URL + '/api/v1/configs'
    const response = await fetch(url)

    if (!response.ok) {
      return false
    }

    return await response.json()
  }
}
