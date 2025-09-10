// API utility functions for frontend-backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = typeof window !== "undefined" ? localStorage.getItem("feesah_token") : null

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === "object") {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API Error:", error)
      throw error
    }
  }

  // Authentication endpoints
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: { email, password },
    })
  }

  async register(name, email, password, phone, whatsapp) {
    return this.request("/auth/register", {
      method: "POST",
      body: { name, email, password, phone, whatsapp },
    })
  }

  async getProfile() {
    return this.request("/auth/profile")
  }

  // Products endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/products${queryString ? `?${queryString}` : ""}`)
  }

  async getProduct(id) {
    return this.request(`/products/${id}`)
  }

  async createProduct(productData) {
    return this.request("/products", {
      method: "POST",
      body: productData,
    })
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: productData,
    })
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Orders endpoints
  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/orders${queryString ? `?${queryString}` : ""}`)
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`)
  }

  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: orderData,
    })
  }

  async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, {
      method: "PUT",
      body: { status },
    })
  }

  // Users endpoints (admin only)
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/users${queryString ? `?${queryString}` : ""}`)
  }

  async getUser(id) {
    return this.request(`/users/${id}`)
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: userData,
    })
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
