"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface GaitCaptureScreenProps {
  onComplete: () => void
  onCancel: () => void
}

export default function GaitCaptureScreen({ onComplete, onCancel }: GaitCaptureScreenProps) {
  const [countdown, setCountdown] = useState(10)
  const [isCapturing, setIsCapturing] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (countdown > 0 && isCapturing) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
        setProgress(((10 - countdown + 1) / 10) * 100)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setIsCapturing(false)
      setTimeout(() => onComplete(), 800)
    }
  }, [countdown, isCapturing, onComplete])

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Behavioral Authentication in Progress</h1>
          <p className="text-muted-foreground text-sm">Analyzing touch, motion, device interaction patterns</p>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col items-center space-y-6">
          {/* Progress Ring */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-muted/20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="text-accent transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-mono font-semibold text-foreground tabular-nums">{countdown}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm text-center">
            <div className="space-y-1">
              <div className="w-2 h-2 bg-accent rounded-full mx-auto animate-pulse" />
              <p className="text-xs text-muted-foreground">Touch</p>
            </div>
            <div className="space-y-1">
              <div
                className="w-2 h-2 bg-accent rounded-full mx-auto animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <p className="text-xs text-muted-foreground">Motion</p>
            </div>
            <div className="space-y-1">
              <div className="w-2 h-2 bg-accent rounded-full mx-auto animate-pulse" style={{ animationDelay: "1s" }} />
              <p className="text-xs text-muted-foreground">Behavior</p>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="pt-8">
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-11 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive bg-transparent"
          >
            <X className="w-4 h-4 mr-2" />
            Abort Authentication
          </Button>
        </div>
      </div>
    </div>
  )
}
