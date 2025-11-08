const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

interface ApiOptions {
  method?: string
  body?: any
  requiresAuth?: boolean
}

export async function apiRequest(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, requiresAuth = true } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const config: RequestInit = {
    method,
    headers,
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}

// Donor API calls
export const donorApi = {
  register: (donorData: any) =>
    apiRequest('/api/donors', { method: 'POST', body: donorData }),

  getAll: () =>
    apiRequest('/api/donors'),

  getById: (id: string) =>
    apiRequest(`/api/donors/${id}`),

  getByBloodType: (bloodType: string) =>
    apiRequest(`/api/donors/blood-type/${bloodType}`),

  delete: (id: string) =>
    apiRequest(`/api/donors/${id}`, { method: 'DELETE' }),
}

// Request API calls
export const requestApi = {
  create: (requestData: any) =>
    apiRequest('/api/requests', { method: 'POST', body: requestData }),

  getAll: (status?: string) =>
    apiRequest(`/api/requests${status ? `?status=${status}` : ''}`),

  getById: (id: string) =>
    apiRequest(`/api/requests/${id}`),

  updateStatus: (id: string, status: string) =>
    apiRequest(`/api/requests/${id}/status`, { method: 'PATCH', body: { status } }),

  delete: (id: string) =>
    apiRequest(`/api/requests/${id}`, { method: 'DELETE' }),
}

// Admin API calls
export const adminApi = {
  getStats: () =>
    apiRequest('/api/admin/stats'),

  getBloodDistribution: () =>
    apiRequest('/api/admin/blood-distribution'),

  getRecentActivity: () =>
    apiRequest('/api/admin/recent-activity'),
}