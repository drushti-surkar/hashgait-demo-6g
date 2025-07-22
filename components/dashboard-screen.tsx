"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, RotateCcw, LogOut, Copy, Activity, Hash, Smartphone, CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface DashboardScreenProps {
  user: { username: string } | null
  onNewCapture: () => void
  onLogout: () => void
}

export default function DashboardScreen({ user, onNewCapture, onLogout }: DashboardScreenProps) {
  const [recentHashes] = useState([
    { hash: "a7f2c9e1...4b7e0c3f", timestamp: "2 min ago", status: "verified" },
    { hash: "b9c3f6a2...5e8c1f4a", timestamp: "15 min ago", status: "verified" },
    { hash: "c1d4e7f0...6c9f2a5d", timestamp: "1 hour ago", status: "verified" },
    { hash: "d2e5f8a1...7d0b3e6c", timestamp: "2 hours ago", status: "verified" },
    { hash: "e3f6a9d2...8e1c4f7a", timestamp: "3 hours ago", status: "verified" },
  ])

  const [stats] = useState({
    uptime: { hours: 2, minutes: 14 },
    totalAuths: 1247,
    todayAuths: 23,
    devices: ["iPhone 15 Pro", "MacBook Pro", "iPad Air"],
  })

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
  }

  const getUserInitials = (username: string) => {
    return username
      .split(/[@.]/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <h1 className="text-xl font-semibold text-foreground">Account Dashboard</h1>
          <ThemeToggle />
        </div>

        {/* User Card */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-primary">
                <AvatarFallback className="text-primary-foreground font-semibold text-sm">
                  {getUserInitials(user?.username || "Demo User")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{user?.username || "demo.user@hashgait.com"}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 text-xs">
                    Platinum
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-xs text-accent">Live</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Metrics */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-base">
              <Activity className="w-4 h-4 mr-2 text-accent" />
              Live Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-foreground">{stats.todayAuths}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">
                  {stats.uptime.hours}h {stats.uptime.minutes}m
                </div>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">{stats.totalAuths}</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Devices */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-base">
              <Smartphone className="w-4 h-4 mr-2 text-muted-foreground" />
              Recent Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span className="text-sm text-foreground">{device}</span>
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Hashes */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-base">
              <Hash className="w-4 h-4 mr-2 text-muted-foreground" />
              Recent Hashes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentHashes.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex-1 min-w-0">
                    <code className="text-xs font-mono text-foreground">{item.hash}</code>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyHash(item.hash)}
                    className="text-muted-foreground hover:text-foreground ml-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={onNewCapture}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Shield className="w-4 h-4 mr-2" />
            New Session
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 border-border text-foreground hover:bg-muted bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>

            <Button
              onClick={onLogout}
              variant="outline"
              className="h-11 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
