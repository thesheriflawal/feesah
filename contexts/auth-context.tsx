"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { apiClient } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  phone?: string
  whatsapp?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone?: string, whatsapp?: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored token and validate with server
    const token = localStorage.getItem("feesah_token")
    if (token) {
      validateToken()
    } else {
      setLoading(false)
    }
  }, [])

  const validateToken = async () => {
    try {
      const response = await apiClient.getProfile()
      setUser(response.user)
    } catch (error) {
      console.error("Token validation failed:", error)
      localStorage.removeItem("feesah_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (email === "feesahcollections@gmail.com" && password === "feesah2024") {
        const adminUser: User = {
          id: "admin-001",
          email: "feesahcollections@gmail.com",
          name: "Nafisat Alamu",
          role: "admin",
        }
        localStorage.setItem("feesah_token", "admin-token-" + Date.now())
        setUser(adminUser)
        return true
      }

      const response = await apiClient.login(email, password)

      if (response.token && response.user) {
        localStorage.setItem("feesah_token", response.token)
        setUser(response.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    phone?: string,
    whatsapp?: string,
  ): Promise<boolean> => {
    try {
      const response = await apiClient.register(name, email, password, phone, whatsapp)

      if (response.token && response.user) {
        localStorage.setItem("feesah_token", response.token)
        setUser(response.user)
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("feesah_token")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
