"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import GaitCaptureScreen from "@/components/gait-capture-screen"
import ResultScreen from "@/components/result-screen"
import BankingApp from "@/components/banking-app"

type Screen = "login" | "capture" | "result" | "banking"

export default function HashGaitApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [user, setUser] = useState<{ username: string } | null>(null)

  const navigateToScreen = (screen: Screen, userData?: { username: string }) => {
    if (userData) {
      setUser(userData)
    }
    setCurrentScreen(screen)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={navigateToScreen} />
      case "capture":
        return (
          <GaitCaptureScreen onComplete={() => navigateToScreen("result")} onCancel={() => navigateToScreen("login")} />
        )
      case "result":
        return (
          <ResultScreen
            onContinue={() => navigateToScreen("banking")}
            onNewCapture={() => navigateToScreen("capture")}
          />
        )
      case "banking":
        return (
          <BankingApp
            user={user}
            onLogout={() => navigateToScreen("login")}
            onNewAuth={() => navigateToScreen("capture")}
          />
        )
      default:
        return <LoginScreen onLogin={navigateToScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative">{renderScreen()}</div>
    </div>
  )
}
