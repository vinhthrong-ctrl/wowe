"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Flame, 
  Target, 
  Users, 
  Map, 
  Sunrise, 
  Moon, 
  Music, 
  Trophy,
  Sparkles,
  Lock,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface AchievementBadge {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

const rarityColors = {
  common: "from-gray-400 to-gray-500",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-amber-400 to-orange-500",
}

const rarityGlows = {
  common: "rgba(156, 163, 175, 0.3)",
  rare: "rgba(59, 130, 246, 0.4)",
  epic: "rgba(168, 85, 247, 0.5)",
  legendary: "rgba(245, 158, 11, 0.5)",
}

export const AVAILABLE_BADGES: AchievementBadge[] = [
  {
    id: "first-event",
    name: "First Steps",
    description: "Attend your first event",
    icon: Star,
    color: "from-blue-400 to-blue-600",
    rarity: "common",
    unlocked: true,
    unlockedAt: "2024-01-15",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Flame,
    color: "from-orange-400 to-red-500",
    rarity: "rare",
    unlocked: true,
    unlockedAt: "2024-02-20",
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Attend 10 events with groups",
    icon: Users,
    color: "from-pink-400 to-rose-500",
    rarity: "rare",
    unlocked: false,
    progress: 6,
    maxProgress: 10,
  },
  {
    id: "explorer",
    name: "Category Explorer",
    description: "Try events from 5 different categories",
    icon: Map,
    color: "from-green-400 to-emerald-500",
    rarity: "common",
    unlocked: true,
    unlockedAt: "2024-03-01",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Attend 5 morning events",
    icon: Sunrise,
    color: "from-amber-300 to-yellow-500",
    rarity: "common",
    unlocked: false,
    progress: 2,
    maxProgress: 5,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Attend 10 night events",
    icon: Moon,
    color: "from-indigo-400 to-purple-600",
    rarity: "rare",
    unlocked: false,
    progress: 4,
    maxProgress: 10,
  },
  {
    id: "music-lover",
    name: "Music Lover",
    description: "Attend 20 music events",
    icon: Music,
    color: "from-violet-400 to-purple-500",
    rarity: "epic",
    unlocked: false,
    progress: 8,
    maxProgress: 20,
  },
  {
    id: "champion",
    name: "Event Champion",
    description: "Attend 100 events",
    icon: Trophy,
    color: "from-amber-400 to-orange-500",
    rarity: "legendary",
    unlocked: false,
    progress: 24,
    maxProgress: 100,
  },
  {
    id: "streak-30",
    name: "Streak Master",
    description: "Maintain a 30-day streak",
    icon: Target,
    color: "from-red-400 to-pink-500",
    rarity: "epic",
    unlocked: false,
    progress: 12,
    maxProgress: 30,
  },
  {
    id: "hidden-gem",
    name: "Hidden Gem",
    description: "???",
    icon: Sparkles,
    color: "from-cyan-400 to-blue-500",
    rarity: "legendary",
    unlocked: false,
  },
]

interface AchievementBadgeCardProps {
  badge: AchievementBadge
  className?: string
}

export function AchievementBadgeCard({ badge, className }: AchievementBadgeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = badge.icon

  return (
    <Card 
      className={cn(
        "glass overflow-hidden transition-all duration-300 cursor-pointer",
        badge.unlocked ? "hover:border-primary/50" : "opacity-60",
        className
      )}
      style={{
        boxShadow: isHovered && badge.unlocked 
          ? `0 0 30px ${rarityGlows[badge.rarity]}` 
          : "none"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Badge Icon */}
          <div className="relative">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center",
              badge.unlocked 
                ? `bg-gradient-to-br ${badge.color}` 
                : "bg-muted"
            )}>
              {badge.unlocked ? (
                <Icon className="w-7 h-7 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            {/* Rarity Indicator */}
            <Badge 
              className={cn(
                "absolute -bottom-1 -right-1 text-[10px] px-1.5 py-0 bg-gradient-to-r text-white border-0",
                rarityColors[badge.rarity]
              )}
            >
              {badge.rarity}
            </Badge>
          </div>

          {/* Badge Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-0.5">{badge.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
            
            {/* Progress or Unlock Date */}
            {badge.unlocked && badge.unlockedAt ? (
              <p className="text-xs text-muted-foreground">
                Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
              </p>
            ) : badge.progress !== undefined && badge.maxProgress !== undefined ? (
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>{badge.progress}/{badge.maxProgress}</span>
                </div>
                <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full bg-gradient-to-r", badge.color)}
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Badge Grid
interface AchievementBadgesGridProps {
  badges?: AchievementBadge[]
  showLocked?: boolean
  className?: string
}

export function AchievementBadgesGrid({ 
  badges = AVAILABLE_BADGES, 
  showLocked = true,
  className 
}: AchievementBadgesGridProps) {
  const displayBadges = showLocked ? badges : badges.filter(b => b.unlocked)
  
  const unlockedCount = badges.filter(b => b.unlocked).length
  const totalCount = badges.length

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <span className="text-sm text-muted-foreground">
          {unlockedCount}/{totalCount} unlocked
        </span>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {displayBadges.map((badge) => (
          <AchievementBadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  )
}

// Mini Badge Display (for profile cards etc)
interface MiniBadgesProps {
  badges: AchievementBadge[]
  maxDisplay?: number
  className?: string
}

export function MiniBadges({ badges, maxDisplay = 4, className }: MiniBadgesProps) {
  const unlockedBadges = badges.filter(b => b.unlocked)
  const displayBadges = unlockedBadges.slice(0, maxDisplay)
  const remaining = unlockedBadges.length - maxDisplay

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {displayBadges.map((badge) => {
        const Icon = badge.icon
        return (
          <div 
            key={badge.id}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
              badge.color
            )}
            title={badge.name}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        )
      })}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted text-xs font-medium">
          +{remaining}
        </div>
      )}
    </div>
  )
}
