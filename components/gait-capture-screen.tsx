"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface GaitCaptureScreenProps {
  onComplete: () => void
  onCancel: () => void
}

export default function GaitCaptureScreen({ onComplete, onCancel }: GaitCaptureScreenProps) {
  const [countdown, setCountdown] = useState(10)
  const [isCapturing, setIsCapturing] = useState(true)

  useEffect(() => {
    if (countdown > 0 && isCapturing) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setIsCapturing(false)
      setTimeout(() => onComplete(), 1000)
    }
  }, [countdown, isCapturing, onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/20 to-black flex flex-col justify-center px-6 relative">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="text-6xl">🏃</div>
        <h1 className="text-2xl font-bold text-white">Capturing Your Gait...</h1>
      </div>

      {/* Animation Area */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Walking Animation */}
        <div className="relative w-64 h-32 bg-slate-800/30 rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sensor Lines */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-transparent via-green-400/30 to-transparent h-px animate-pulse"
                style={{
                  top: `${20 + i * 10}%`,
                  left: "10%",
                  right: "10%",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-green-400 tabular-nums">{countdown}</div>
          <p className="text-slate-300">Analyzing touch, motion, behavior...</p>
        </div>

        {/* Progress Ring */}
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-700"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (countdown / 10)}`}
              className="text-green-400 transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Cancel Button */}
      <div className="pb-8">
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full h-12 border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl bg-transparent"
        >
          <X className="w-5 h-5 mr-2" />
          Cancel / Abort
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 right-8 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
    </div>
  )
}
