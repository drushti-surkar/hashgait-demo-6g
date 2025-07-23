"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, ArrowRight, RotateCcw, Shield, Server, Hash } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface ResultScreenProps {
  onContinue: () => void
  onNewCapture: () => void
}

export default function ResultScreen({ onContinue, onNewCapture }: ResultScreenProps) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const transactionHash = "a7f2c9e1d4f8b3e6c2f9a1d4b7e0c3f6a9d2b5e8c1f4a7d0b3e6c9f2a5d8b1e4"
  const confidenceScore = 96
  const riskLevel = "Low"

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(type)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Authentication Verified</h1>
          <p className="text-sm text-muted-foreground">Secure access granted to your account</p>
        </div>

        {/* Primary Result */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-6 h-6 text-accent" />
                <span className="text-2xl font-semibold text-accent">Verified</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-foreground">{confidenceScore}%</div>
                <p className="text-sm text-muted-foreground">Confidence Score</p>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-3 py-1">
                Risk Level: {riskLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground text-base">
              <Hash className="w-4 h-4 mr-2" />
              Authentication Hash
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <code className="flex-1 text-xs font-mono bg-muted/50 p-3 rounded border text-muted-foreground break-all">
                {transactionHash}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(transactionHash, "hash")}
                className="text-muted-foreground hover:text-foreground"
              >
                {copiedHash === "hash" ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Backend Status */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-foreground text-base">
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-2" />
                System Status
              </div>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                <div className="w-2 h-2 bg-accent rounded-full mr-2" />
                Secure
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-foreground">256-bit</div>
                <p className="text-xs text-muted-foreground">Encryption</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">&lt; 2ms</div>
                <p className="text-xs text-muted-foreground">Response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onContinue}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Continue to Account
          </Button>

          <Button
            onClick={onNewCapture}
            variant="outline"
            className="w-full h-12 border-border text-foreground hover:bg-muted bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Re-authenticate
          </Button>
        </div>
      </div>
    </div>
  )
}
