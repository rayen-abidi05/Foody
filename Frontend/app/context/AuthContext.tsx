"use client"
import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [islogged, setislogged] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true) 
  
  const checkLogin = async () => {
    const res = await fetch("/api/auth/checkingLogin", {
      method: "POST",
      credentials: "include",
    })
    const data = await res.json()
    setislogged(data.message === "logged in")
    setLoading(false) 
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ islogged, checkLogin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)