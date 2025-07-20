"use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import GaitCaptureScreen from "@/components/gait-capture-screen"
import ResultScreen from "@/components/result-screen"
import DashboardScreen from "@/components/dashboard-screen"

type Screen = "login" | "capture" | "result" | "dashboard"

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
          <GaitCaptureScreen
            onComplete={() => navigateToScreen("result")}
            onCancel={() => navigateToScreen("dashboard")}
          />
        )
      case "result":
        return (
          <ResultScreen
            onViewDashboard={() => navigateToScreen("dashboard")}
            onNewCapture={() => navigateToScreen("capture")}
          />
        )
      case "dashboard":
        return (
          <DashboardScreen
            user={user}
            onNewCapture={() => navigateToScreen("capture")}
            onLogout={() => navigateToScreen("login")}
          />
        )
      default:
        return <LoginScreen onLogin={navigateToScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative">{renderScreen()}</div>
    </div>
  )
}
