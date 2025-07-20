"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, Eye, RotateCcw } from "lucide-react"

interface ResultScreenProps {
  onViewDashboard: () => void
  onNewCapture: () => void
}

export default function ResultScreen({ onViewDashboard, onNewCapture }: ResultScreenProps) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const nodeHash =
    "af2b7c9e1d4f8a3b6e2c9f1a4d7b0e3c8f5a2d9b6e1c4f7a0d3b8e5c2f9a6d1b4e7c0f3a6d9b2e5c8f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8d1b4e7c0f3a6d9b2e5c8f1a"
  const icpHash =
    "b9c3f6a2e5d8b1e4c7f0a3d6b9e2c5f8a1d4b7e0c3f6a9d2b5e8c1f4a7d0b3e6c9f2a5d8b1e4c7f0a3d6b9e2c5f8a1d4b7e0c3f6a9d2b5e8c1f4a7d0b3e6c9f2a5d8b1e4c7f0a3d6b9e2"

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(type)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-black p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="text-6xl">🔗</div>
        <h1 className="text-2xl font-bold text-white">Authentication Results</h1>
      </div>

      <div className="space-y-6">
        {/* Node.js Backend */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <span>Node.js Backend</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-slate-400 mb-2">SHA-256 Hash:</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-xs font-mono bg-slate-900/50 p-2 rounded border text-green-400 break-all">
                  {nodeHash.substring(0, 64)}...
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(nodeHash, "node")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedHash === "node" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ICP Backend */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-white">
              <span>ICP Backend</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Success
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-1">92%</div>
              <p className="text-sm text-slate-400">Confidence Score</p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Pattern Hash:</p>
              <div className="flex items-center space-x-2">
                <code className="flex-1 text-xs font-mono bg-slate-900/50 p-2 rounded border text-blue-400 break-all">
                  {icpHash.substring(0, 64)}...
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(icpHash, "icp")}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedHash === "icp" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onViewDashboard}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Eye className="w-5 h-5 mr-2" />
            View Dashboard
          </Button>

          <Button
            onClick={onNewCapture}
            variant="outline"
            className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl bg-transparent"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start New Capture
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse" />
    </div>
  )
}
