export function api(path: string, init?: RequestInit) {
  const baseURL = 'http://localhost:3000'
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseURL)

  return fetch(url, init)
}
