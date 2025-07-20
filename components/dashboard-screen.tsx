"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Rocket, RotateCcw, LogOut, Copy, Activity, Cpu, Hash } from "lucide-react"

interface DashboardScreenProps {
  user: { username: string } | null
  onNewCapture: () => void
  onLogout: () => void
}

export default function DashboardScreen({ user, onNewCapture, onLogout }: DashboardScreenProps) {
  const [sensorData, setSensorData] = useState({
    accel: { x: 0, y: 0, z: 0 },
    gyro: { x: 0, y: 0, z: 0 },
  })
  const [uptime, setUptime] = useState({ hours: 2, minutes: 14 })

  // Simulate live sensor data
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        accel: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: 9.8 + (Math.random() - 0.5) * 0.5,
        },
        gyro: {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1,
          z: (Math.random() - 0.5) * 0.1,
        },
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const recentHashes = [
    { hash: "af2b7c9e...1bf4", timestamp: "2 min ago" },
    { hash: "b9c3f6a2...eea", timestamp: "15 min ago" },
    { hash: "c1d4e7f0...3a6", timestamp: "1 hour ago" },
    { hash: "d2e5f8a1...b4e", timestamp: "2 hours ago" },
    { hash: "e3f6a9d2...c5f", timestamp: "3 hours ago" },
  ]

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/20 to-black p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="space-y-6">
        {/* User Card */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-blue-600">
                <AvatarFallback className="text-white font-semibold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{user?.username || "demo_user"}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-green-400">Active Session</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Sensor Readings */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Live Sensor Readings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-2">Accelerometer (m/s²)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">X</div>
                  <div className="text-green-400 font-mono text-sm">{sensorData.accel.x.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">Y</div>
                  <div className="text-green-400 font-mono text-sm">{sensorData.accel.y.toFixed(2)}</div>
                </div>
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">Z</div>
                  <div className="text-green-400 font-mono text-sm">{sensorData.accel.z.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Gyroscope (rad/s)</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">X</div>
                  <div className="text-blue-400 font-mono text-sm">{sensorData.gyro.x.toFixed(3)}</div>
                </div>
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">Y</div>
                  <div className="text-blue-400 font-mono text-sm">{sensorData.gyro.y.toFixed(3)}</div>
                </div>
                <div className="bg-slate-900/50 p-2 rounded text-center">
                  <div className="text-xs text-slate-400">Z</div>
                  <div className="text-blue-400 font-mono text-sm">{sensorData.gyro.z.toFixed(3)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Hash History */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Hash className="w-5 h-5 mr-2 text-purple-400" />
              Recent Hash History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentHashes.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-900/30 rounded">
                  <div>
                    <code className="text-sm font-mono text-purple-400">{item.hash}</code>
                    <p className="text-xs text-slate-400">{item.timestamp}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyHash(item.hash)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backend Stats */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-orange-400" />
              Backend Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {uptime.hours}h {uptime.minutes}m
                </div>
                <p className="text-xs text-slate-400">Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">1,247</div>
                <p className="text-xs text-slate-400">Total Hashes</p>
              </div>
              <div className="text-center col-span-2">
                <div className="text-xl font-bold text-green-400">45 MB</div>
                <p className="text-xs text-slate-400">Memory Usage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button
            onClick={onNewCapture}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Rocket className="w-5 h-5 mr-2" />🚀 New Capture
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />🔄 Refresh Data
            </Button>

            <Button
              onClick={onLogout}
              variant="outline"
              className="h-10 border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />🔓 Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-16 right-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 left-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
    </div>
  )
}
