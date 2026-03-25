"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { XPRings } from "@/components/xp-rings"
import { XPBadge, LevelProgress, StreakDisplay, getLevel } from "@/components/xp-badge"
import { AchievementBadgesGrid, MiniBadges, AVAILABLE_BADGES } from "@/components/achievement-badges"
import { MiniLeaderboard } from "@/components/leaderboard"
import { EventCard, type EventData } from "@/components/event-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, 
  Settings, 
  Bell, 
  Ticket, 
  Clock, 
  Flame,
  Target,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Image as ImageIcon
} from "lucide-react"
import Link from "next/link"

// Mock user data
const userData = {
  name: "Rahul Kumar",
  email: "rahul@example.com",
  avatar: "",
  xp: 2450,
  streak: 12,
  longestStreak: 23,
  eventsAttended: 24,
  totalPhotos: 18,
  joinedDate: "January 2024",
  rings: [
    { label: "Activity", value: 72, max: 100, color: "#f43f5e", glowColor: "rgba(244, 63, 94, 0.5)" },
    { label: "Social", value: 58, max: 100, color: "#a855f7", glowColor: "rgba(168, 85, 247, 0.5)" },
    { label: "Explorer", value: 45, max: 100, color: "#10b981", glowColor: "rgba(16, 185, 129, 0.5)" },
  ],
  weeklyGoal: {
    target: 3,
    completed: 2,
  },
}

const upcomingEvents: EventData[] = [
  {
    id: "u1",
    title: "Morning Yoga at Sunset Point",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    date: "Tomorrow",
    time: "6:00 AM",
    location: "Sunset Point, Bandra",
    price: 299,
    spotsLeft: 12,
    totalSpots: 30,
    xpReward: 50,
  },
  {
    id: "u2",
    title: "Standup Comedy Night",
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop",
    date: "Sat, Mar 28",
    time: "8:00 PM",
    location: "Canvas Laugh Club",
    price: 799,
    spotsLeft: 45,
    totalSpots: 200,
    xpReward: 50,
  },
]

const pastEvents = [
  {
    id: "p1",
    title: "Midnight Run Club - 10K",
    category: "Run Club",
    date: "Mar 15, 2026",
    xpEarned: 75,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200&h=200&fit=crop",
  },
  {
    id: "p2",
    title: "Pottery Workshop",
    category: "Workshop",
    date: "Mar 10, 2026",
    xpEarned: 50,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop",
  },
  {
    id: "p3",
    title: "Coffee Tasting Session",
    category: "Cafe",
    date: "Mar 5, 2026",
    xpEarned: 50,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
  },
]

const dailyChallenges = [
  { id: "c1", title: "Attend an event", xp: 50, completed: false },
  { id: "c2", title: "Post a photo", xp: 10, completed: true },
  { id: "c3", title: "Like 5 posts", xp: 10, completed: false, progress: 3, max: 5 },
]

export default function DashboardPage() {
  const level = getLevel(userData.xp)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarFallback className="text-xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <XPBadge xp={userData.xp} size="sm" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* XP Rings Card */}
              <Card className="glass-strong overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                      <XPRings rings={userData.rings} size="lg" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-4">Your Life XP</h2>
                      <LevelProgress xp={userData.xp} className="mb-6" />
                      
                      {/* Weekly Goal */}
                      <div className="p-4 rounded-xl bg-muted/30 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Weekly Goal</span>
                          <span className="text-sm text-muted-foreground">
                            {userData.weeklyGoal.completed}/{userData.weeklyGoal.target} events
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {Array.from({ length: userData.weeklyGoal.target }).map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-2 rounded-full ${
                                i < userData.weeklyGoal.completed ? "bg-primary" : "bg-muted/50"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <StreakDisplay 
                        currentStreak={userData.streak} 
                        longestStreak={userData.longestStreak} 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="glass">
                  <CardContent className="p-4 text-center">
                    <Ticket className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{userData.eventsAttended}</div>
                    <div className="text-xs text-muted-foreground">Events Attended</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4 text-center">
                    <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                    <div className="text-2xl font-bold">{userData.streak}</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4 text-center">
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold">{userData.totalPhotos}</div>
                    <div className="text-xs text-muted-foreground">Photos Shared</div>
                  </CardContent>
                </Card>
                <Card className="glass">
                  <CardContent className="p-4 text-center">
                    <Target className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-xs text-muted-foreground">Categories Tried</div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Events */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Upcoming Events
                  </CardTitle>
                  <Link href="/discover">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} variant="compact" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Past Events / Memory Timeline */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Memory Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pastEvents.map((event, index) => (
                      <div key={event.id} className="flex items-center gap-4">
                        <div className="relative">
                          <div 
                            className="w-14 h-14 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />
                          {index < pastEvents.length - 1 && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-border" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{event.category}</span>
                            <span>|</span>
                            <span>{event.date}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          +{event.xpEarned} XP
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Full Timeline
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Challenges */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Daily Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyChallenges.map((challenge) => (
                      <div 
                        key={challenge.id}
                        className={`p-3 rounded-lg ${
                          challenge.completed ? "bg-green-500/10" : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${challenge.completed ? "line-through text-muted-foreground" : ""}`}>
                            {challenge.title}
                          </span>
                          <Badge variant={challenge.completed ? "secondary" : "default"} className="text-xs">
                            +{challenge.xp} XP
                          </Badge>
                        </div>
                        {challenge.progress !== undefined && !challenge.completed && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{challenge.progress}/{challenge.max}</span>
                            </div>
                            <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(challenge.progress / (challenge.max || 1)) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Preview */}
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Recent Achievements</CardTitle>
                  <Link href="/profile/achievements">
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <MiniBadges badges={AVAILABLE_BADGES} maxDisplay={5} />
                  <p className="text-xs text-muted-foreground mt-3">
                    {AVAILABLE_BADGES.filter(b => b.unlocked).length} of {AVAILABLE_BADGES.length} unlocked
                  </p>
                </CardContent>
              </Card>

              {/* Mini Leaderboard */}
              <MiniLeaderboard />

              {/* Become a Host CTA */}
              <Card className="glass-strong border-primary/30 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Ready to host?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your passion and earn while doing what you love.
                  </p>
                  <Link href="/host">
                    <Button className="w-full neon-glow">Become a Host</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
