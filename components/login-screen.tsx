"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface LoginScreenProps {
  onLogin: (screen: "capture", userData: { username: string }) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)
    onLogin("capture", { username: email || "demo.user@hashgait.com" })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-primary rounded-lg flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back to HashGait</h1>
          <p className="text-muted-foreground text-sm">Secure behavioral authentication platform</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card border-border text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-card border-border text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">Demo mode active — any credentials accepted</p>
        </div>
      </div>
    </div>
  )
}
