const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '')
).replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
  })

  const isJsonResponse = response.headers.get('content-type')?.includes('application/json')
  const payload = isJsonResponse ? await response.json() : null

  if (!response.ok) {
    const errorMessage = payload?.error || `Request failed with status ${response.status}`
    throw new Error(errorMessage)
  }

  return payload
}

export async function fetchPublicContent() {
  return request('/api/content/')
}

export async function createLead(payload) {
  return request('/api/leads/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export { API_BASE_URL }
