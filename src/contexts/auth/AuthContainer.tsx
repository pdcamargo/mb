import React, { createContext, useState, useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import fetcher from '@/config/fetcher'
import { BaseResponse } from '@/types/api-response'

export type AuthError = {
  statusCode: number
  message: string
}

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null
  error: AuthError | null
  login: (username: string, password: string) => Promise<void>
  logout: (callbackUrl?: string) => void
}
const AuthContext = createContext({} as AuthContextType)

const AuthContainer: React.FC = ({ children }) => {
  const { push } = useRouter()
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState<AuthError>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token')
      const user = Cookies.get('user')
      if (token) {
        if (user) {
          setUser(JSON.parse(user))
          setToken(token)
        }
      }
      setIsLoading(false)
    }
    loadUserFromCookies()
  }, [])

  const login = async (username: string, password: string) => {
    setIsLoading(true)

    try {
      const {
        data: { data }
      } = await fetcher.post<BaseResponse>('auth/login/freelancer', {
        username,
        password
      })

      const { freelancer: user, access_token: token } = data

      if (token) {
        Cookies.set('token', token, { expires: 60 * 60 * 3 })
        Cookies.set('user', JSON.stringify(user), { expires: 60 * 60 * 3 })
        setUser(user)
        setToken(token)
      }
    } catch (err) {
      const hasErrorData = Boolean(err?.response?.data)
      const statusCode = err?.request?.status || 0
      const message = hasErrorData
        ? err?.response?.data?.message || err?.response?.data?.error
        : err?.request?.statusText

      setError({
        statusCode,
        message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (callbackUrl?: string) => {
    Cookies.remove('token')
    setUser(null)
    setToken(null)
    push(callbackUrl || '/auth')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user && !!token,
        isLoading,
        user,
        token,
        error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContainer

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  return context
}

export function useProtectRoute(callbackUrl?: string): void {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.push(callbackUrl || '/auth')
  }, [isLoading, isAuthenticated])
}
