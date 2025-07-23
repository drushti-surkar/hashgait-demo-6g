"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  LogOut,
  Eye,
  EyeOff,
  Plus,
  Send,
  Smartphone,
  Building2,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface BankingAppProps {
  user: { username: string } | null
  onLogout: () => void
  onNewAuth: () => void
}

export default function BankingApp({ user, onLogout, onNewAuth }: BankingAppProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const accountData = {
    balance: 24567.89,
    accountNumber: "****7892",
    routingNumber: "021000021",
    availableCredit: 15000,
    creditUsed: 2340,
  }

  const transactions = [
    {
      id: 1,
      type: "debit",
      amount: 89.5,
      merchant: "Whole Foods Market",
      date: "Today, 2:34 PM",
      category: "Groceries",
    },
    { id: 2, type: "credit", amount: 2500.0, merchant: "Salary Deposit", date: "Today, 9:00 AM", category: "Income" },
    {
      id: 3,
      type: "debit",
      amount: 45.0,
      merchant: "Shell Gas Station",
      date: "Yesterday, 6:45 PM",
      category: "Transportation",
    },
    { id: 4, type: "debit", amount: 1200.0, merchant: "Rent Payment", date: "Jan 1, 2024", category: "Housing" },
    { id: 5, type: "debit", amount: 67.89, merchant: "Amazon Purchase", date: "Dec 30, 2023", category: "Shopping" },
  ]

  const cards = [
    { id: 1, type: "Checking", number: "****7892", balance: 24567.89, primary: true },
    { id: 2, type: "Savings", number: "****3456", balance: 45230.12, primary: false },
    { id: 3, type: "Credit", number: "****9876", balance: -2340.0, limit: 15000, primary: false },
  ]

  const getUserInitials = (username: string) => {
    return username
      .split(/[@.]/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-primary">
              <AvatarFallback className="text-primary-foreground font-semibold text-sm">
                {getUserInitials(user?.username || "Demo User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-foreground">Good afternoon</h1>
              <p className="text-sm text-muted-foreground">{user?.username || "demo.user@hashgait.com"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewAuth}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Shield className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transfer">Transfer</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-primary-foreground/80 text-sm">Total Balance</p>
                    <div className="flex items-center space-x-2">
                      {showBalance ? (
                        <h2 className="text-3xl font-bold">{formatCurrency(accountData.balance)}</h2>
                      ) : (
                        <h2 className="text-3xl font-bold">••••••</h2>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowBalance(!showBalance)}
                        className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-foreground/80 text-sm">Account</p>
                    <p className="font-mono text-lg">{accountData.accountNumber}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.4% this month
                  </Badge>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-medium text-foreground">Send Money</h3>
                  <p className="text-xs text-muted-foreground mt-1">Transfer to anyone</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">Mobile Deposit</h3>
                  <p className="text-xs text-muted-foreground mt-1">Deposit checks</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground flex items-center justify-between">
                  <span>Recent Activity</span>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {transactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-accent/10" : "bg-muted"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="w-5 h-5 text-accent" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-sm ${
                          transaction.type === "credit" ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="space-y-4">
              {cards.map((card) => (
                <Card key={card.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {card.type === "Credit" ? (
                            <CreditCard className="w-6 h-6 text-primary" />
                          ) : card.type === "Savings" ? (
                            <Building2 className="w-6 h-6 text-primary" />
                          ) : (
                            <DollarSign className="w-6 h-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{card.type} Account</h3>
                          <p className="text-sm text-muted-foreground font-mono">{card.number}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          {card.type === "Credit" ? "Current Balance" : "Available Balance"}
                        </span>
                        <span className={`font-semibold ${card.balance < 0 ? "text-destructive" : "text-foreground"}`}>
                          {formatCurrency(card.balance)}
                        </span>
                      </div>
                      {card.limit && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Credit Limit</span>
                          <span className="font-semibold text-foreground">{formatCurrency(card.limit)}</span>
                        </div>
                      )}
                      {card.primary && (
                        <Badge className="bg-accent/10 text-accent border-accent/20 w-fit">Primary Account</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transfer Tab */}
          <TabsContent value="transfer" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Send Money</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">To</label>
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    className="w-full h-12 px-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full h-12 px-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Note (optional)</label>
                  <input
                    type="text"
                    placeholder="What's this for?"
                    className="w-full h-12 px-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  <Send className="w-4 h-4 mr-2" />
                  Send Money
                </Button>
              </CardContent>
            </Card>

            {/* Recent Recipients */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground">Recent Recipients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", email: "sarah.j@email.com", amount: "$250.00" },
                    { name: "Mike Chen", email: "mike.chen@email.com", amount: "$89.50" },
                    { name: "Emma Wilson", email: "emma.w@email.com", amount: "$125.00" },
                  ].map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 bg-primary">
                          <AvatarFallback className="text-primary-foreground font-semibold text-sm">
                            {recipient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground text-sm">{recipient.name}</p>
                          <p className="text-xs text-muted-foreground">{recipient.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-foreground">{recipient.amount}</p>
                        <p className="text-xs text-muted-foreground">Last sent</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
