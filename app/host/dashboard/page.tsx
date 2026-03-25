"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { XPRings } from "@/components/xp-rings"
import { StreakCounter, DailyChallenges, RewardProgress } from "@/components/streak-counter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  Star,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Ticket,
  Wallet,
  Sparkles,
  Target,
  Flame,
  Trophy,
  Gift
} from "lucide-react"
import Link from "next/link"

// Mock host data
const hostData = {
  name: "Maya Singh",
  level: 12,
  levelTitle: "Pro Host",
  xpCurrent: 2450,
  xpToNext: 3000,
  streak: 8,
  rings: [
    { label: "Hosting", value: 85, max: 100, color: "#f97316", glowColor: "rgba(249, 115, 22, 0.5)" },
    { label: "Engagement", value: 72, max: 100, color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.5)" },
    { label: "Growth", value: 68, max: 100, color: "#14b8a6", glowColor: "rgba(20, 184, 166, 0.5)" },
  ],
  stats: {
    totalEarnings: 245000,
    thisMonthEarnings: 45000,
    totalEvents: 156,
    totalAttendees: 3420,
    repeatRate: 68,
    avgRating: 4.9,
  },
  pendingPayout: 12500,
  nextPayoutDate: "Mar 28, 2026",
}

const upcomingEvents = [
  {
    id: "1",
    title: "Morning Yoga at Sunset Point",
    date: "Tomorrow, 6:00 AM",
    bookings: 18,
    capacity: 30,
    revenue: 5382,
    status: "active",
    trend: "up",
  },
  {
    id: "2",
    title: "Evening Flow Yoga",
    date: "Sat, Mar 28, 5:00 PM",
    bookings: 12,
    capacity: 25,
    revenue: 4188,
    status: "active",
    trend: "stable",
  },
  {
    id: "3",
    title: "Beach Meditation Session",
    date: "Sun, Mar 29, 7:00 AM",
    bookings: 8,
    capacity: 20,
    revenue: 1592,
    status: "draft",
    trend: "up",
  },
]

const recentPayouts = [
  { id: "1", date: "Mar 15, 2026", amount: 15200, events: 4, status: "completed" },
  { id: "2", date: "Mar 1, 2026", amount: 18500, events: 5, status: "completed" },
  { id: "3", date: "Feb 15, 2026", amount: 12800, events: 3, status: "completed" },
]

const analyticsData = {
  views: { value: 2450, change: 12 },
  bookings: { value: 89, change: 8 },
  revenue: { value: 45000, change: 15 },
  repeatGuests: { value: 68, change: 5 },
}

const achievements = [
  { id: 1, name: "First Event", icon: "🎉", unlocked: true },
  { id: 2, name: "100 Attendees", icon: "👥", unlocked: true },
  { id: 3, name: "5 Star Host", icon: "⭐", unlocked: true },
  { id: 4, name: "1K Earned", icon: "💰", unlocked: true },
  { id: 5, name: "Week Streak", icon: "🔥", unlocked: true },
  { id: 6, name: "Super Host", icon: "🏆", unlocked: false },
]

export default function HostDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month")

  const xpProgress = (hostData.xpCurrent / hostData.xpToNext) * 100

  return (
    <main className="min-h-screen mesh-gradient">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Welcome */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {hostData.name.split(' ')[0]}!</h1>
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Flame className="w-3 h-3 mr-1" />
                  {hostData.streak} day streak
                </Badge>
              </div>
              <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your events</p>
            </div>
            <div className="flex gap-3">
              <Link href="/host/analytics">
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </Button>
              </Link>
              <Link href="/host/create-event">
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Level Progress Bar */}
          <Card className="glass mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-xl font-bold text-white">
                    {hostData.level}
                  </div>
                  <div>
                    <p className="font-semibold">{hostData.levelTitle}</p>
                    <p className="text-sm text-muted-foreground">{hostData.xpCurrent} / {hostData.xpToNext} XP</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Next reward</p>
                  <p className="font-medium flex items-center gap-1">
                    <Gift className="w-4 h-4 text-primary" />
                    10% payout bonus
                  </p>
                </div>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Eye, label: "Page Views", value: analyticsData.views.value.toLocaleString(), change: analyticsData.views.change, color: "from-blue-500 to-cyan-500" },
                  { icon: Ticket, label: "Bookings", value: analyticsData.bookings.value, change: analyticsData.bookings.change, color: "from-purple-500 to-pink-500" },
                  { icon: DollarSign, label: "Revenue", value: `₹${(analyticsData.revenue.value / 1000).toFixed(0)}K`, change: analyticsData.revenue.change, color: "from-green-500 to-teal-500" },
                  { icon: Users, label: "Repeat Rate", value: `${analyticsData.repeatGuests.value}%`, change: analyticsData.repeatGuests.change, color: "from-orange-500 to-red-500" },
                ].map((stat) => (
                  <Card key={stat.label} className="glass card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="secondary" className={`text-xs ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {stat.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                          {Math.abs(stat.change)}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upcoming Events */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <Link href="/host/events">
                    <Button variant="ghost" size="sm" className="text-primary">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div 
                      key={event.id}
                      className={`
                        flex items-center justify-between p-4 rounded-xl
                        bg-gradient-to-r from-muted/30 to-transparent
                        hover:from-muted/50 transition-all cursor-pointer
                        ${index === 0 ? 'ring-2 ring-primary/30' : ''}
                      `}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{event.title}</h4>
                          <Badge 
                            variant={event.status === "active" ? "default" : "secondary"} 
                            className={`text-[10px] ${event.status === "active" ? "bg-green-500/20 text-green-500" : ""}`}
                          >
                            {event.status}
                          </Badge>
                          {event.trend === "up" && (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.bookings}/{event.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">₹{event.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">revenue</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payouts */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="w-5 h-5 text-primary" />
                    Payouts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Pending Payout Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-green-500/10 via-teal-500/10 to-cyan-500/10 border border-green-500/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pending Payout</p>
                        <p className="text-3xl font-bold text-green-500">₹{hostData.pendingPayout.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">Arriving</p>
                        <p className="font-medium">{hostData.nextPayoutDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {recentPayouts.map((payout) => (
                      <div 
                        key={payout.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">₹{payout.amount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{payout.events} events</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{payout.date}</p>
                          <Badge variant="secondary" className="text-[10px] text-green-500 bg-green-500/10">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Host XP Rings */}
              <Card className="glass-strong overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-teal-500" />
                <CardContent className="p-6 pt-8">
                  <div className="text-center mb-6">
                    <Badge className="mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      {hostData.levelTitle}
                    </Badge>
                    <h3 className="font-semibold">Host Performance</h3>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <XPRings rings={hostData.rings} size="md" />
                  </div>

                  {/* Mini achievements */}
                  <div className="flex flex-wrap justify-center gap-2 pb-4 border-b border-border mb-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`
                          w-10 h-10 rounded-lg flex items-center justify-center text-lg
                          ${achievement.unlocked 
                            ? 'bg-muted/50' 
                            : 'bg-muted/20 grayscale opacity-50'
                          }
                        `}
                        title={achievement.name}
                      >
                        {achievement.icon}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent">
                      <span className="text-sm text-muted-foreground">Total Earnings</span>
                      <span className="font-bold">₹{(hostData.stats.totalEarnings / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent">
                      <span className="text-sm text-muted-foreground">Total Attendees</span>
                      <span className="font-bold">{hostData.stats.totalAttendees.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-transparent">
                      <span className="text-sm text-muted-foreground">Avg Rating</span>
                      <span className="font-bold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        {hostData.stats.avgRating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Streak Counter */}
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <StreakCounter streak={hostData.streak} type="weekly" size="sm" />
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Current streak</p>
                      <p className="text-2xl font-bold">{hostData.streak} weeks</p>
                      <p className="text-xs text-green-500">Keep hosting!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Challenges */}
              <Card className="glass">
                <CardContent className="p-6">
                  <DailyChallenges />
                </CardContent>
              </Card>

              {/* Reward Progress */}
              <RewardProgress 
                current={7} 
                target={10} 
                reward="Featured Host Badge" 
              />

              {/* Pro Tips */}
              <Card className="glass border-primary/30 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Pro Tip
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Events with photos get <span className="text-primary font-medium">3x more bookings</span>. Add high-quality images to your upcoming events to boost visibility!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
