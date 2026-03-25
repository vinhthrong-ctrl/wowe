"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Award, TrendingUp, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLevel } from "@/components/xp-badge"

interface LeaderboardUser {
  id: string
  name: string
  avatar?: string
  xp: number
  rank: number
  eventsAttended: number
  streak: number
  city?: string
  change?: number // rank change from previous period
}

const mockLeaderboardData: LeaderboardUser[] = [
  { id: "1", name: "Priya Sharma", xp: 8450, rank: 1, eventsAttended: 87, streak: 23, city: "Mumbai", change: 0 },
  { id: "2", name: "Arjun Patel", xp: 7820, rank: 2, eventsAttended: 72, streak: 18, city: "Mumbai", change: 2 },
  { id: "3", name: "Sneha Reddy", xp: 6950, rank: 3, eventsAttended: 65, streak: 15, city: "Bangalore", change: -1 },
  { id: "4", name: "Vikram Singh", xp: 6200, rank: 4, eventsAttended: 58, streak: 12, city: "Delhi", change: 1 },
  { id: "5", name: "Ananya Iyer", xp: 5800, rank: 5, eventsAttended: 54, streak: 10, city: "Chennai", change: -2 },
  { id: "6", name: "Rahul Kumar", xp: 5400, rank: 6, eventsAttended: 49, streak: 8, city: "Mumbai", change: 3 },
  { id: "7", name: "Meera Nair", xp: 4950, rank: 7, eventsAttended: 45, streak: 7, city: "Hyderabad", change: 0 },
  { id: "8", name: "Karan Kapoor", xp: 4600, rank: 8, eventsAttended: 42, streak: 5, city: "Pune", change: -1 },
  { id: "9", name: "Divya Menon", xp: 4200, rank: 9, eventsAttended: 38, streak: 4, city: "Mumbai", change: 2 },
  { id: "10", name: "Aditya Rao", xp: 3850, rank: 10, eventsAttended: 35, streak: 3, city: "Bangalore", change: -1 },
]

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
  return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-semibold">{rank}</span>
}

interface LeaderboardRowProps {
  user: LeaderboardUser
  isCurrentUser?: boolean
}

function LeaderboardRow({ user, isCurrentUser = false }: LeaderboardRowProps) {
  const level = getLevel(user.xp)

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl transition-all",
      isCurrentUser ? "bg-primary/10 border border-primary/30" : "hover:bg-muted/30",
      user.rank <= 3 && "bg-gradient-to-r from-transparent via-muted/20 to-transparent"
    )}>
      {/* Rank */}
      <div className="w-10 flex justify-center">
        <RankIcon rank={user.rank} />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className={cn(
          "w-10 h-10",
          user.rank === 1 && "ring-2 ring-yellow-500",
          user.rank === 2 && "ring-2 ring-gray-400",
          user.rank === 3 && "ring-2 ring-amber-600"
        )}>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold truncate">{user.name}</span>
            {isCurrentUser && (
              <Badge variant="outline" className="text-[10px] py-0">You</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{level.name}</span>
            {user.city && (
              <>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {user.city}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-6 text-sm">
        <div className="text-center">
          <div className="font-semibold">{user.eventsAttended}</div>
          <div className="text-xs text-muted-foreground">Events</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-orange-500">{user.streak}</div>
          <div className="text-xs text-muted-foreground">Streak</div>
        </div>
      </div>

      {/* XP and Change */}
      <div className="text-right">
        <div className="font-bold text-primary">{user.xp.toLocaleString()} XP</div>
        {user.change !== undefined && user.change !== 0 && (
          <div className={cn(
            "flex items-center justify-end gap-1 text-xs",
            user.change > 0 ? "text-green-500" : "text-red-500"
          )}>
            <TrendingUp className={cn("w-3 h-3", user.change < 0 && "rotate-180")} />
            {Math.abs(user.change)}
          </div>
        )}
      </div>
    </div>
  )
}

interface LeaderboardProps {
  currentUserId?: string
  className?: string
}

export function Leaderboard({ currentUserId = "6", className }: LeaderboardProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all")
  
  const cities = ["all", ...new Set(mockLeaderboardData.map(u => u.city).filter(Boolean))]
  
  const filteredData = selectedCity === "all" 
    ? mockLeaderboardData 
    : mockLeaderboardData.filter(u => u.city === selectedCity)

  return (
    <Card className={cn("glass-strong", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Leaderboard
          </CardTitle>
          
          <Tabs value={selectedCity} onValueChange={setSelectedCity}>
            <TabsList className="glass">
              {cities.slice(0, 4).map((city) => (
                <TabsTrigger key={city} value={city} className="text-xs capitalize">
                  {city === "all" ? "All Cities" : city}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {filteredData.map((user) => (
            <LeaderboardRow 
              key={user.id} 
              user={user} 
              isCurrentUser={user.id === currentUserId}
            />
          ))}
        </div>

        {/* Current User Position (if not in top 10) */}
        {currentUserId && !filteredData.find(u => u.id === currentUserId) && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Your Position</p>
            <LeaderboardRow 
              user={{
                id: currentUserId,
                name: "You",
                xp: 2450,
                rank: 156,
                eventsAttended: 24,
                streak: 5,
                city: "Mumbai"
              }} 
              isCurrentUser 
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Mini Leaderboard for sidebar/widgets
export function MiniLeaderboard({ className }: { className?: string }) {
  const topThree = mockLeaderboardData.slice(0, 3)

  return (
    <Card className={cn("glass", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          Top Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topThree.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <RankIcon rank={user.rank} />
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user.name}</div>
              </div>
              <div className="text-sm font-semibold text-primary">{user.xp.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
